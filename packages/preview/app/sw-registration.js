import { Workbox } from 'workbox-window';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js', {
      scope: '/',
      type: 'module',
    });

    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        // If it's an update, we can notify the user or reload the page
        if (confirm('New content is available. Reload to update?')) {
          window.location.reload();
        }
      }
    });

    wb.register().catch((err) => {
      console.error('Service worker registration failed:', err);
    });
  }
}

export default {
  initialize() {
    registerServiceWorker();
  },
};
