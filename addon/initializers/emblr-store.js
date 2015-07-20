import EmblrStore from "ember-emblr/services/application"

export function initialize(container, application) {
  // application.inject('route', 'foo', 'service:foo');
  let config = container.lookupFactory('config:environment');

  let emblrStore = EmblrStore.create({
    queryBase: (config.environment === "production") ? "http://" + config.tumblr + ".tumblr.com/" : config.baseURL + "tumblr-mock/"
  });

  application.register('emblrStore:main', emblrStore, {instantiate: false});
  application.inject('route', 'emblrStore', 'emblrStore:main');
  application.inject('controller', 'emblrStore', 'emblrStore:main');
}

export default {
  name: 'emblr-store',
  initialize: initialize
};
