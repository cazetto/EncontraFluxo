import * as api from "ts-resource-tastypie";
import { APPLICATION_API_CONFIG } from './config';

const UserService = {
  resource: new api.Tastypie.Resource('usuario', { provider: APPLICATION_API_CONFIG.name }),
  id: null,
  get() {
    return this.resource.objects.get(this.id);
  }
}

export default UserService;
