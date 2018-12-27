import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';

const CloudinaryImageComponent = Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'width', 'height'],

  width: computed.alias('options.width'),
  height: computed.alias('options.height'),

  src: computed('publicId', 'width', 'height', function() {
    return $.cloudinary.url(this.get('publicId'), this.get('options'));
  })
});

CloudinaryImageComponent.reopenClass({
  positionalParams: ['publicId', 'options']
});

export default CloudinaryImageComponent;
