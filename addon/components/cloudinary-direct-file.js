import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { run, next } from '@ember/runloop';
import Ember from 'ember';

export default Component.extend({
  tagName: 'input',
  classNames: ['cloudinary-fileupload'],

  attributeBindings: ['name', 'type', 'data-cloudinary-field', 'data-form-data', 'multiple', 'style', 'accept'],

  // Attributes
  name: 'file',
  type: 'file',
  multiple: false,
  fieldName: null,
  'data-cloudinary-field': computed.alias('fieldName'),
  accept: 'image/jpeg,image/gif,image/png',
  style: htmlSafe(""),

  // Endpoint
  signatureEndpoint: null,

  // Default Options
  disableImageResize: false,
  imageMaxWidth: 10000000,
  imageMaxHeight: 10000000,
  acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp|ico)$/i,
  maxFileSize: 50000000,
  loadImageMaxFileSize: 50000000,
  
  signOptions: null,

  // Fetch signature
  init() {
    this._super(...arguments);

    if (!this.get('signatureEndpoint')) {
      console.error('`signatureEndpoint` parameter must be specified on cloudinary-direct-file component.');
    }
    
    let signOptions = Object.assign({ timestamp: Date.now() / 1000 }, this.get('signOptions') || {});

    Ember.$.get(this.get('signatureEndpoint'), signOptions).done((response) => {
      run(() => { this.set('data-form-data', JSON.stringify(response)); });
    });
  },

  didSetData: observer('data-form-data', function() {
    next(this, function() {
      Ember.$().cloudinary_fileupload({
        disableImageResize: this.get('disableImageResize'),
        imageMaxWidth:      this.get('imageMaxWidth'),
        imageMaxHeight:     this.get('imageMaxHeight'),
        acceptFileTypes:    this.get('acceptFileTypes'),
        maxFileSize:        this.get('maxFileSize'),
        loadImageMaxFileSize: this.get('loadImageMaxFileSize')
      });
    });
  }),

  onUploadDone() {},
  fileProgress() {},
  allFileProgress() {},
  onUploadStart() {},
  onUploadStop() {},
  onUploadFail() {},
  onUploadAlways() {},

  didInsertElement() {
    const $ = this.$();
    $.bind('cloudinarydone', this.onUploadDone.bind(this));
    $.bind('cloudinaryprogress', this.fileProgress.bind(this));
    $.bind('cloudinaryprogressall', this.allFileProgress.bind(this));
    $.bind('cloudinarystart', this.onUploadStart.bind(this));
    $.bind('cloudinarystop', this.onUploadStop.bind(this));
    $.bind('cloudinaryfail', this.onUploadFail.bind(this));
    $.bind('fileuploadprocessfail', this.onUploadFail.bind(this));
    $.bind('cloudinaryalways', this.onUploadAlways.bind(this));
  }
});
