import * as api from "ts-resource-tastypie";
import { APPLICATION_API_CONFIG } from './config';

const UserService = {
  resource: new api.Tastypie.Resource('usuario', { provider: APPLICATION_API_CONFIG.name }),
  id: null,
  user: null,
  get(id) {
    return this.resource.objects.get(id || this.id);
  },
  update(data) {
    return this.resource.objects.update(this.id, data);
  }
}

export default UserService;
