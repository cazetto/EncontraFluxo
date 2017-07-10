import * as api from "ts-resource-tastypie";

const MaterialService = {
  resource: new api.Tastypie.Resource('material'),
  find(data) {
    return this.resource.objects.find(16, data);
  }
}

export default MaterialService;
