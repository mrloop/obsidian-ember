import { module, test } from 'qunit';
import { visit, currentURL, waitUntil } from '@ember/test-helpers';
import { setupApplicationTest } from 'preview/tests/helpers';

module('Acceptance | query params', function (hooks) {
  setupApplicationTest(hooks);

  test('renders content from source query param with lang=gjs', async function (assert) {
    const source = encodeURIComponent('<template>bat</template>');
    await visit(`/?lang=gjs&source=${source}`);

    assert.strictEqual(currentURL(), `/?lang=gjs&source=${source}`);

    await waitUntil(
      () => {
        const appElement = document.querySelector('#ember-testing');
        return appElement && appElement.textContent.includes('bat');
      },
      { timeout: 5000 },
    );

    assert.dom().containsText('bat');
  });
});
