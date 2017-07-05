import * as api from "ts-resource-tastypie";

const SkillService = {
  resource: new api.Tastypie.Resource('habilidade'),
  find(data) {
    return this.resource.objects.find(data);
  }
}

export default SkillService;
