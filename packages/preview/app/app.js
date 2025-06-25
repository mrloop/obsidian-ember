import Application from '@ember/application';
import compatModules from '@embroider/virtual/compat-modules';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import swRegistration from './sw-registration';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver.withModules(compatModules);
}

loadInitializers(App, config.modulePrefix, compatModules);

// Register service worker after app initialization
document.addEventListener('DOMContentLoaded', () => {
  swRegistration.initialize();
});

Object.assign(window, {
  process: { env: {} },
  Buffer: {},
});
