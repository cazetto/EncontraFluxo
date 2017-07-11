import * as api from "ts-resource-tastypie";
import { APPLICATION_API_CONFIG } from './config';

const MaterialService = {
  resource: new api.Tastypie.Resource('material', { provider: APPLICATION_API_CONFIG.name }),
  find(data) {
    return this.resource.objects.find(data);
  }
}

export default MaterialService;
