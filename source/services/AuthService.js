import * as api from "ts-resource-tastypie";

const AuthService = {
  resources: {
    login: new api.Tastypie.Resource('login'),
    signup: new api.Tastypie.Resource('novo_usuario'),
    forgot: new api.Tastypie.Resource('recuperar-senha'),
  },
  signup(data) {
    return this.resources.signup.objects.create(data);
  },
  login(data) {
    return this.resources.login.objects.create(data);
  },
  forgot(data) {
    return this.resources.forgot.objects.create(data);
  }
}

export default AuthService;
