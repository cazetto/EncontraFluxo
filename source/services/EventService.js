import * as api from "ts-resource-tastypie";
import { APPLICATION_API_CONFIG } from './config';

const EventService = {
  data: {},
  resource: new api.Tastypie.Resource('evento', { provider: APPLICATION_API_CONFIG.name }),
  find(data) {
    return this.resource.objects.find(data);
  },
  get(id) {
    return this.resource.objects.get(id);
  },
  save() {
    return this.data.id ?
    this.resource.objects.update(this.data.id, this.data) :
    this.resource.objects.create(this.data);
  }
}

export default EventService;
