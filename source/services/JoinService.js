import * as api from "ts-resource-tastypie";
import { APPLICATION_API_CONFIG } from './config';

const JoinService = {
  resource: new api.Tastypie.Resource('colaborar', { provider: APPLICATION_API_CONFIG.name }),

  create(data) {
    return this.resource.objects.find(data);
  }

}

export default JoinService;
