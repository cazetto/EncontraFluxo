import * as api from "ts-resource-tastypie";

const MaterialService = {
  resource: new api.Tastypie.Resource('material'),
  find(data) {
    return this.resource.objects.find(data);
  }
}

export default MaterialService;
