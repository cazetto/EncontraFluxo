import * as api from "ts-resource-tastypie";

const NeighborhoodService = {
  resource: new api.Tastypie.Resource('bairro'),
  find(data) {
    return this.resource.objects.find(data);
  },
  get(id) {
    return this.resource.objects.get(id);
  }
}

export default NeighborhoodService;
