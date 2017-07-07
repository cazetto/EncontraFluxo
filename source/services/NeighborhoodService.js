import * as api from "ts-resource-tastypie";

const NeighborhoodService = {
  resource: new api.Tastypie.Resource('bairro'),
  find(data) {
    return this.resource.objects.find(data);
  }
}

export default NeighborhoodService;
