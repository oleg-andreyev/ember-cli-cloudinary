import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('cloudinary-image', 'Integration | Component | cloudinary image', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    Ember.$.cloudinary.config({ cloud_name: 'cloud-name', api_key: '12345', secure: true });
  });

  test('it renders an image', async function(assert) {
    await this.render(hbs`{{cloudinary-image 'test'}}`);

    assert.equal(this.$('img').attr('src'), 'https://res.cloudinary.com/cloud-name/image/upload/test');
  });


  test('it renders an image with width and height options', async function(assert) {
    await this.render(hbs`{{cloudinary-image 'test' (hash width=100 height=100)}}`);

    assert.equal(this.$('img').attr('src'), 'https://res.cloudinary.com/cloud-name/image/upload/test');
    assert.equal(this.$('img').attr('width'), 100);
    assert.equal(this.$('img').attr('height'), 100);
  });


  test('it renders an image with width and height options in url and attributes', async function(assert) {
    await this.render(hbs`{{cloudinary-image 'test' (hash width=100 height=100 crop='fill')}}`);

    assert.equal(this.$('img').attr('src'), 'https://res.cloudinary.com/cloud-name/image/upload/c_fill,h_100,w_100/test');
    assert.equal(this.$('img').attr('width'), 100);
    assert.equal(this.$('img').attr('height'), 100);
  });
});
