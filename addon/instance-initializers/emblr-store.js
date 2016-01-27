
export function initialize(applicationInstance) {
  console.log(applicationInstance);
  let config     = applicationInstance.container.lookupFactory('config:environment');
  let emblrStore = applicationInstance.container.lookup('emblrStore:main');

  emblrStore.set("queryBase",(config.environment === "production") ? "http://" + config.tumblr + ".tumblr.com/" : config.baseURL + "tumblr-mock/");
}

export default {
  name: 'emblr-store',
  initialize: initialize
};
