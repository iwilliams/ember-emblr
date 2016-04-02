export function initialize(applicationInstance) {
    // The docs say this should just be applicationInstance.lookup, but that doesn't seem to work :/
    let config     = applicationInstance.container.lookupFactory('config:environment');
    let emblrStore = applicationInstance.container.lookup('emblrStore:main');

    emblrStore.set("queryBase",(config.environment === "production") ? "http://" + window.location.hostname "/" : config.baseURL + "tumblr-mock/");
}

export default {
    name: 'emblr-store',
    initialize: initialize
};
