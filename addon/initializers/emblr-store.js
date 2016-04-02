import EmblrStore from "ember-emblr/services/application"

export function initialize() {
  const app = arguments[1] || arguments[0];
  const emblrStore = EmblrStore.create({});

  app.register('emblrStore:main', emblrStore, {instantiate: false});
  app.inject('route', 'emblrStore', 'emblrStore:main');
  app.inject('controller', 'emblrStore', 'emblrStore:main');
}

export default {
  name: 'emblr-store',
  initialize: initialize
};
