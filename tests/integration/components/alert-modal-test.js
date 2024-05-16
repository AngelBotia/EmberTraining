import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | alert-modal', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<AlertModal />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <AlertModal>
        template block text
      </AlertModal>
    `);

    assert.dom().hasText('template block text');
  });
});
