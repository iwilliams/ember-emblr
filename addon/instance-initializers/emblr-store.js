export function initialize(applicationInstance) {
  const config = applicationInstance.resolveRegistration('config:environment');
  const emblrStore = applicationInstance.lookup('emblrStore:main');

  emblrStore.set("queryBase", (config.environment === "production") ? `http://${window.location.hostname}/` : `${config.baseURL}tumblr-mock/`);
}

export default {
  name: 'emblr-store',
  initialize: initialize
};
