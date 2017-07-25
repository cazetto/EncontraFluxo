import * as api from "ts-resource-tastypie";
import { APPLICATION_API_CONFIG } from './config';

const EventService = {
  data: {},
  resource: new api.Tastypie.Resource('evento', { provider: APPLICATION_API_CONFIG.name }),
  resourceInFlux: new api.Tastypie.Resource('evento/no-fluxo', { provider: APPLICATION_API_CONFIG.name }),
  resourceHappening: new api.Tastypie.Resource('evento/acontecendo', { provider: APPLICATION_API_CONFIG.name }),
  resourceJoin: new api.Tastypie.Resource('evento/colaborar', { provider: APPLICATION_API_CONFIG.name }),
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
  },
  delete(id) {
    return this.resource.objects.delete(id);
  },
  findInFlux(data) {
    return this.resourceInFlux.objects.find();
  },
  findHappening(data) {
    return this.resourceHappening.objects.find(data);
  },
  join(data) {
    // return this.resourceJoin.objects.update(data.evento_id, data);
    return this.resourceJoin.objects.create(data);
  }
}

export default EventService;
