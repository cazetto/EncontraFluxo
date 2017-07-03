import * as api from "ts-resource-tastypie";

const AuthService = {
  resources: {
    login: new api.Tastypie.Resource('login'),
    signup: new api.Tastypie.Resource('novo_usuario'),
  },
  signup(data) {
    return this.resources.signup.objects.create(data);
  },
  login(data) {
    return this.resources.login.objects.create(data);
  },
}

export default AuthService;
