import Media from '@wordpress/media';
import template from '@wordpress/template';
import ajax from '@wordpress/ajax';
import jQuery from 'jQuery';
import smartcrop from 'smartcrop';

const $ = jQuery;

/**
 * Image editor.
 */
const ImageEditor = Media.View.extend( {
	tagName: 'div',
	className: 'hm-thumbnail-editor',
	template: template( 'hm-thumbnail-editor' ),
	events: {
		'click .button-apply-changes': 'saveCrop',
		'click .button-reset': 'reset',
		'click .image-preview-full': 'onClickPreview',
		'click .focal-point': 'removeFocalPoint',
		'click .imgedit-menu button': 'onEditImage',
	},
	initialize() {
		// Re-render on size change.
		this.listenTo( this.model, 'change:size', this.loadEditor );
		this.on( 'ready', this.loadEditor );

		// Set window imageEdit._view to this and no-op built in crop tool.
		if ( window.imageEdit ) {
			window.imageEdit._view = this;
			window.imageEdit.initCrop = () => {};
			window.imageEdit.setCropSelection = () => {};
		}
	},
	loadEditor() {
		this.render();

		const size = this.model.get( 'size' );

		if ( size !== 'full' && size !== 'full-orig' ) {
			// Load cropper if we picked a thumbnail.
			this.initCropper();
		} else {
			// Load focal point UI.
			this.initFocalPoint();
		}
	},
	refresh() {
		this.update();
	},
	back() {},
	save() {
		this.update();
	},
	update() {
		this.model.fetch( {
			success: () => this.loadEditor(),
			error: () => {},
		} );
	},
	reset() {
		const $image     = $( 'img[id^="image-preview-"]' );
		const sizeName   = this.model.get( 'size' );
		const sizes      = this.model.get( 'sizes' );
		const focalPoint = this.model.get( 'focalPoint' );
		const size       = sizes[ sizeName ] || null;

		if ( ! size ) {
			return;
		}

		const crop = size.cropData;

		// Reset to smart crop by default.
		if ( ! crop.hasOwnProperty( 'x' ) ) {
			const options = {
				width: size.width,
				height: size.height,
			};

			// Boost focal point.
			if ( focalPoint ) {
				options.boost = [ {
					x: focalPoint.x,
					y: focalPoint.y,
					width: size.width,
					height: size.height,
					weight: 1,
				} ];
			}

			smartcrop
				.crop( $image.get( 0 ), options )
				.then( ( { topCrop } ) => {
					this.setSelection( topCrop );
				} );
		} else {
			this.setSelection( crop );
		}
	},
	saveCrop() {
		const crop = this.cropper.getSelection();

		// Disable buttons.
		this.onSelectStart();

		// Send AJAX request to save the crop coordinates.
		ajax.post( 'hm_save_crop', {
			_ajax_nonce: this.model.get( 'nonces' ).edit,
			id: this.model.get( 'id' ),
			crop: {
				x: crop.x1,
				y: crop.y1,
				width: crop.width,
				height: crop.height,
			},
			size: this.model.get( 'size' ),
		} )
			// Re-enable buttons.
			.always( () => {
				this.onSelectEnd();
			} )
			.done( () => {
				// Update & re-render.
				this.update();
			} )
			.fail( error => console.log( error ) );
	},
	setSelection( crop ) {
		this.onSelectStart();

		if ( ! crop || typeof crop.x === 'undefined' ) {
			this.cropper.setOptions( { show: true } );
			this.cropper.update();
			return;
		}

		this.cropper.setSelection( crop.x, crop.y, crop.x + crop.width, crop.y + crop.height );
		this.cropper.setOptions( { show: true } );
		this.cropper.update();
	},
	onSelectStart() {
		$( '.button-apply-changes, .button-reset' ).attr( 'disabled', 'disabled' );
	},
	onSelectEnd() {
		$( '.button-apply-changes, .button-reset' ).removeAttr( 'disabled' );
	},
	onSelectChange() {
		$( '.button-apply-changes:disabled, .button-reset:disabled' ).removeAttr( 'disabled' );
	},
	initCropper() {
		const view     = this;
		const $image   = $( 'img[id^="image-preview-"]' );
		const $parent  = $image.parent();
		const sizeName = this.model.get( 'size' );
		const sizes    = this.model.get( 'sizes' );
		const size     = sizes[ sizeName ] || null;

		if ( ! size ) {
			// Handle error.
			return;
		}

		const aspectRatio = `${size.width}:${size.height}`;

		// Load imgAreaSelect.
		this.cropper = $image.imgAreaSelect( {
			parent: $parent,
			instance: true,
			handles: true,
			keys: true,
			imageWidth: this.model.get( 'width' ),
			imageHeight: this.model.get( 'height' ),
					minWidth: size.width,
			minHeight: size.height,
			aspectRatio: aspectRatio,
			onInit( img ) {
				// Ensure that the imgAreaSelect wrapper elements are position:absolute.
				// (even if we're in a position:fixed modal)
				const $img = $( img );
				$img.next().css( 'position', 'absolute' )
					.nextAll( '.imgareaselect-outer' ).css( 'position', 'absolute' );

				// Set initial crop.
				view.reset();
			},
			onSelectStart() {
				view.onSelectStart( ...arguments );
			},
			onSelectEnd() {
				view.onSelectEnd( ...arguments );
			},
			onSelectChange() {
				view.onSelectChange( ...arguments );
			}
		} );
	},
	initFocalPoint() {
		const width = this.model.get( 'width' );
		const height = this.model.get( 'height' );
		const focalPoint = this.model.get( 'focalPoint' ) || {};
		const $focalPoint = this.$el.find( '.focal-point' );

		if ( focalPoint.hasOwnProperty( 'x' ) && focalPoint.hasOwnProperty( 'y' ) ) {
			$focalPoint.css( {
				left: `${ ( 100 / width ) * focalPoint.x }%`,
				top: `${ ( 100 / height ) * focalPoint.y }%`,
				display: 'block',
			} );
		}
	},
	onClickPreview( event ) {
		const width = this.model.get( 'width' );
		const height = this.model.get( 'height' );
		const x = event.offsetX * ( width / event.currentTarget.offsetWidth );
		const y = event.offsetY * ( height / event.currentTarget.offsetHeight );
		const $focalPoint = this.$el.find( '.focal-point' );

		$focalPoint.css( {
			left: `${ ( 100 / width ) * x }%`,
			top: `${ ( 100 / height ) * y }%`,
			display: 'block',
		} );

		this.setFocalPoint( { x, y } );
	},
	setFocalPoint( coords ) {
		ajax.post( 'hm_save_focal_point', {
			_ajax_nonce: this.model.get( 'nonces' ).edit,
			id: this.model.get( 'id' ),
			focalPoint: coords,
		} )
			.done( () => {
				this.update();
			} )
			.fail( error => console.log( error ) );
	},
	removeFocalPoint( event ) {
		this.$el.find( '.focal-point' ).hide();
		event.stopPropagation();
		this.setFocalPoint( false );
	},
	onEditImage() {
		this.$el.find( '.focal-point, .note-focal-point' ).hide();
	},
} );

export default ImageEditor;
