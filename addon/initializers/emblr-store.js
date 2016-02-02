import EmblrStore from "ember-emblr/services/application"

export function initialize(container, application) {
    let emblrStore = EmblrStore.create({});

    application.register('emblrStore:main', emblrStore, {instantiate: false});
    application.inject('route', 'emblrStore', 'emblrStore:main');
    application.inject('controller', 'emblrStore', 'emblrStore:main');
}

export default {
    name: 'emblr-store',
    initialize: initialize
};
