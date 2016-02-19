export function initialize(applicationInstance) {
  const config = applicationInstance.resolveRegistration('config:environment');
  const emblrStore = applicationInstance.lookup('emblrStore:main');

  emblrStore.set("queryBase", (config.environment === "production") ? `http://${config.tumblr}.tumblr.com/` : `${config.baseURL}tumblr-mock/`);
}

export default {
  name: 'emblr-store',
  initialize: initialize
};
