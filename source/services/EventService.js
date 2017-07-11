import * as api from "ts-resource-tastypie";

const EventService = {
  data: {},
  resource: new api.Tastypie.Resource('interesse'),
  find(data) {
    return this.resource.objects.find(data);
  }
}

export default EventService;
