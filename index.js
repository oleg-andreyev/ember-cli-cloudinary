/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-cloudinary',

  included: function(app) {
    this._super.included(app);
    
    let root = findHost(this);

    this.import(root.bowerDirectory + '/blueimp-file-upload/js/vendor/jquery.ui.widget.js');
    this.import(root.bowerDirectory + '/blueimp-file-upload/js/jquery.iframe-transport.js');
    this.import(root.bowerDirectory + '/blueimp-file-upload/js/jquery.fileupload.js');
    this.import(root.bowerDirectory + '/blueimp-file-upload/js/jquery.fileupload-process.js');
    this.import(root.bowerDirectory + '/blueimp-file-upload/js/jquery.fileupload-validate.js');
    this.import(root.bowerDirectory + '/cloudinary-jquery-file-upload/cloudinary-jquery-file-upload.js');
  }
};

function findHost(addon) {
  var current = addon;
  var app;

  do {
    app = current.app || app;
  } while (current.parent.parent && (current = current.parent));

  return app;
}
