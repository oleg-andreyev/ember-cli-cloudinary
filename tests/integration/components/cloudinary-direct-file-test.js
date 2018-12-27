import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('cloudinary-direct-file', 'Integration | Component | cloudinary direct file', function (hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function () {
    Ember.$.get = function() {
      return { done(cb) { cb({ some: 'response' }); } };
    };
    this.set('actions', {});
  });

  test('it requests an upload signature on render', async function(assert) {
    assert.expect(1);

    Ember.$.get = function(url) {
      assert.equal(url, '/signature_endpoint');
      return { done(cb) { cb({ some: 'response' }); } };
    };

    await render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint'}}`);
  });


  test('it reports an error when signatureEndpoint parameter is not specified', async function(assert) {
    assert.expect(1);

    console.error = function(msg) {
      assert.equal(msg, '`signatureEndpoint` parameter must be specified on cloudinary-direct-file component.');
    };

    await render(hbs`{{cloudinary-direct-file}}`);
  });


  test('it sets data-form-data from signatureEndpoint response', async function(assert) {
    await render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint'}}`);
    assert.equal(this.$('input').attr('data-form-data'), "{\"some\":\"response\"}");
  });


// Bind events
  test('it sends onUploadDone when event triggered', async function(assert) {
    assert.expect(2);
    
    this.set('actions.testAction', function(e, data) {
      assert.equal(e.type, 'cloudinarydone');
      assert.deepEqual(data, { result: 'test' });
    });

    await render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint' onUploadDone=(action 'testAction')}}`);

    this.$('input').trigger('cloudinarydone', { result: 'test' });
  });


  test('it sends fileProgress when event triggered', async function(assert) {
    assert.expect(2);

    this.set('actions.testAction', function(e, data) {
      assert.equal(e.type, 'cloudinaryprogress');
      assert.deepEqual(data, { result: 'test' });
    });

    await render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint' fileProgress=(action 'testAction')}}`);

    this.$('input').trigger('cloudinaryprogress', { result: 'test' });
  });


  test('it sends allFileProgress when event triggered', async function(assert) {
    assert.expect(2);

    this.set('actions.testAction', function(e, data) {
      assert.equal(e.type, 'cloudinaryprogressall');
      assert.deepEqual(data, { result: 'test' });
    });

    await render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint' allFileProgress=(action 'testAction')}}`);

    this.$('input').trigger('cloudinaryprogressall', { result: 'test' });
  });


  test('it sends onUploadStart when event triggered', async function(assert) {
    assert.expect(2);

    this.set('actions.testAction', function(e, data) {
      assert.equal(e.type, 'cloudinarystart');
      assert.deepEqual(data, { result: 'test' });
    });

    await render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint' onUploadStart=(action 'testAction')}}`);

    this.$('input').trigger('cloudinarystart', { result: 'test' });
  });


  test('it sends onUploadStop when event triggered', async function(assert) {
    assert.expect(2);

    this.set('actions.testAction', function(e, data) {
      assert.equal(e.type, 'cloudinarystop');
      assert.deepEqual(data, { result: 'test' });
    });

    await render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint' onUploadStop=(action 'testAction')}}`);

    this.$('input').trigger('cloudinarystop', { result: 'test' });
  });


  test('it sends onUploadFail when event triggered', async function(assert) {
    assert.expect(2);

    this.set('actions.testAction', function(e, data) {
      assert.equal(e.type, 'cloudinaryfail');
      assert.deepEqual(data, { result: 'test' });
    });

    await render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint' onUploadFail=(action 'testAction')}}`);

    this.$('input').trigger('cloudinaryfail', { result: 'test' });
  });


  test('it sends onUploadAlways when event triggered', async function(assert) {
    assert.expect(2);

    this.set('actions.testAction', function(e, data) {
      assert.equal(e.type, 'cloudinaryalways');
      assert.deepEqual(data, { result: 'test' });
    });

    await render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint' onUploadAlways=(action 'testAction')}}`);

    this.$('input').trigger('cloudinaryalways', { result: 'test' });
  });
});
