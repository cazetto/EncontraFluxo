import * as api from "ts-resource-tastypie";

const APIService = {
  services: {},
  init(name, url) {
    this.services[name] = { name, url };
    api.Tastypie.Provider.add(
      new api.Tastypie.Provider({name, url})
    );
  },
  authorize(name, username, apikey) {
    console.log('apikey', apikey);
    const service = this.services[name];
    api.Tastypie.Provider.add(
      new api.Tastypie.Provider({ name: service.name, url: service.url, username, apikey })
    );
  }
}

export default APIService;
