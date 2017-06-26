// React imports
import React, { Component } from 'react';

// React Native imports
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

// Other vendors imports
import _ from 'lodash';
import update from 'immutability-helper';
import Toast from 'react-native-easy-toast';

// Custom components
import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

// Services import
// import User from '../../api/User';

export default class RegisterComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        // nome: 'Andre',
        // email: Math.random()*99999+'andre@test.com',
        // senha: '123123123',
        nome: '',
        email: '',
        senha: '',
        convite_doador: null,
        convite_instituicao: null,
        empresa_contato_email: '',
        empresa_contato_nome: '',
        empresa_contato_telefone: '',
        empresa_nome: '',
        empresa_telefone: '',
        is_empresa: false,
        is_influenciador: false,
      },
      isFetching: false,
    };
  }

  register() {
    this.setState({isFetching: true});
    // User.register(this.state.credentials)
    // .then(response => {
    //   console.log(response);
    //   let username = response.email;
    //   let password = response.senha;
    //   let credentials = { username, password };
    //   this.registerSuccess(credentials);
    // })
    // .catch(error => {this.registerFail()});
  }

  registerSuccess(credentials) {
    this.setState({isFetching: false});
    this.toast.show('Cadastrado!');
    // User.doLogin(credentials)
    // .then(response => {this.loginSuccess(1000)})
    // .catch(error => {this.loginFail()});
  }

  registerFail() {
    this.setState({isFetching: false});
    this.toast.show('Dados incorretos!');
  }

  loginSuccess(wait) {
    this.toast.show('Login efetuado!');
    if(!wait) this.goToNextScreen();
    else {
      const delay = setTimeout(() => {
        clearTimeout(delay);
        this.goToNextScreen();
      }, wait);
    }
  }

  goToNextScreen() {
    this.setState({isFetching: false});
    // PCProductSearch, Coupons, Dashboard, Ongs, Impact, FAQ, Comparator
    // this.props.navigation.navigate('Comparator');
  }

  loginFail() {
    this.setState({isFetching: false});
    this.toast.show('Dados incorretos!');
  }

  delayedChangeCredentials(field) {
    return (
      _.debounce(value => {
        let credentials = update(this.state.credentials, {$merge: {[field]:value}});
        this.setState({credentials});
      }, 140)
    );
  }

  renderRegisterButton() {
    return !this.state.isFetching ? (
      <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {this.register()}}
      style={[styles.touchable, styles.registerBackgroundColor]}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    ) : (
      <ActivityIndicator
        size="large"
        color="#fff"
        style={styles.loginIndicator}
      />
    );
  }

  renderBack() {
    return !this.state.isFetching ? (
      <TouchableRedirectorWrapper path="/auth/login" content={
        <View style={[styles.touchable]}>
          <Text style={styles.buttonText}>Voltar</Text>
        </View>
      } />
    ) : null;
  }

  render() {
    return (
      <View style={styles.content}>
        <View style={[styles.textInputs]}>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="Nome"
              defaultValue={this.state.credentials.nome}
              onChangeText={this.delayedChangeCredentials('nome')}
              keyboardType="default"
              selectTextOnFocus
              underlineColorAndroid="transparent"
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="E-mail"
              defaultValue={this.state.credentials.email}
              onChangeText={this.delayedChangeCredentials('email')}
              keyboardType="email-address"
              selectTextOnFocus
              underlineColorAndroid="transparent"
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="Senha"
              defaultValue={this.state.credentials.senha}
              onChangeText={this.delayedChangeCredentials('senha')}
              secureTextEntry
              selectTextOnFocus
              underlineColorAndroid="transparent"
              style={styles.textInput}
            />
          </View>
        </View>

        <View style={styles.actions}>
          {this.renderRegisterButton()}
          {this.renderBack()}
        </View>

        <Toast
          ref={(c) => { this.toast = c; }}
          style={{backgroundColor:'#d32f2f'}}
          position='top'
          positionValue={155}
          fadeInDuration={750}
          fadeOutDuration={2000}
          opacity={0.8}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    width: null,
    height: null,
  },
  logoImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  textInputs: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputWrapper: {
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    height: 40,
    marginTop: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  registerBackgroundColor: {
    backgroundColor: '#D73352',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16
  },
  touchable: {
    margin: 4,
    padding: 14,
    marginHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  actions: {
    marginTop: 20,
    width: '100%',
  },
  loginIndicator: {
    marginTop: 4,
    marginBottom: 5,
  },
});
