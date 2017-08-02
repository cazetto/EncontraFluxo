// React imports
import React, { Component } from 'react';

// React Native imports
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

// Other vendors imports
import { Redirect } from 'react-router-native';
import update from 'immutability-helper';
import _ from 'lodash';
import Toast from 'react-native-easy-toast';
import { CheckBox } from 'react-native-elements';

// Custom components
import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

// Shared styles
import styles from '../styles';

// Utils imports
import { saveUser, getSavedUser } from '../../../utils/AuthUtils';

// Services imports
import UserService from '../../../services/UserService';
import AuthService from '../../../services/AuthService';
import APIService from '../../../services/APIService';
import { APPLICATION_API_CONFIG } from '../../../services/config';

export default class SignupComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        bairro_id: 1,
        // nome: 'André Pesci Cazetto',
        // email: (Math.random()* 1000) + 'user@gmail.com',
        // senha: '123456',
        nome: '',
        email: '',
        senha: '',
        habilidades: [],
        interesses: [],
      },
      keepMeLoggedIn: true,
      isFetching: false,
    };
  }

  signup() {
    this.setState({isFetching: true});
    AuthService.signup(this.state.data)
    .then(response => this.signupSuccess())
    .catch(error => this.signupFail());
  }

  signupSuccess() {
    this.login();
  }

  signupFail() {
    this.setState({isFetching: false});
    this.refs.toast.show('Dados incorretos!');
  }

  login() {
    this.setState({isFetching: true});
    AuthService.login({
      username: this.state.data.email,
      password: this.state.data.senha
    })
    .then(response => this.loginSuccess(response))
    .catch(error => this.loginFail(error));
  }

  loginSuccess(response) {
    console.log(APPLICATION_API_CONFIG.name, response.username, response.api_key);
    APIService.authorize(APPLICATION_API_CONFIG.name, response.username, response.api_key);
    this.state.keepMeLoggedIn && saveUser(response);
    UserService.id = response.id;
    UserService.user = response;
    this.refs.toast.show('Cadastro/Login efetuado!');
    const delay = setTimeout(() => {
      clearTimeout(delay);
      this.setState({signupComplete: true});
    }, 1000);
  }

  loginFail() {
    this.setState({isFetching: false});
    this.refs.toast.show('Dados incorretos!');
  }

  delayedChangeCredentials(field) {
    return (
      _.debounce(value => {
        let data = update(this.state.data, {$merge: {[field]:value}});
        this.setState({data});
      }, 140)
    );
  }

  renderSignupButton() {
    return !this.state.isFetching ? (
      <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {this.signup()}}
      style={[styles.touchable, styles.signupButtonColor]}
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

  done() {
    if(this.state.data.nome && this.state.data.email && this.state.data.senha) this.signup();
  }

  render() {
    return (
      this.state.signupComplete ? <Redirect to="/app/neighborhoods" /> :
      <View style={styles.content}>
        <View style={[styles.textInputs]}>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="Nome"
              defaultValue={this.state.data.nome}
              onChangeText={this.delayedChangeCredentials('nome')}
              keyboardType="default"
              selectTextOnFocus
              underlineColorAndroid="transparent"
              returnKeyType="next"
              blurOnSubmit={true}
              onSubmitEditing={() => {this.refs.emailTextInput.focus()}}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              ref='emailTextInput'
              placeholder="E-mail"
              defaultValue={this.state.data.email}
              onChangeText={this.delayedChangeCredentials('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              returnKeyType="next"
              blurOnSubmit={true}
              onSubmitEditing={() => {this.refs.passwordTextInput.focus()}}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              ref='passwordTextInput'
              placeholder="Senha"
              defaultValue={this.state.data.senha}
              onChangeText={this.delayedChangeCredentials('senha')}
              secureTextEntry
              selectTextOnFocus
              underlineColorAndroid="transparent"
              returnKeyType="done"
              blurOnSubmit={true}
              onSubmitEditing={() => {this.done()}}
              style={styles.textInput}
            />
          </View>
          <View style={styles.keepMeLoggedInWrapper}>
            <CheckBox
              checkedColor='#546E7A'
              left
              iconLeft
              title="Manter logado"
              checked={this.state.keepMeLoggedIn}
              onPress={() => this.setState({keepMeLoggedIn:!this.state.keepMeLoggedIn})}
              style={styles.keepMeLoggedIn}
            />
          </View>
        </View>

        <View style={styles.actions}>
          {this.renderSignupButton()}
          {this.renderBack()}
        </View>

        <Toast
          ref="toast"
          style={styles.toast}
          position='top'
          positionValue={-48}
          fadeInDuration={750}
          fadeOutDuration={2000}
          opacity={0.8}
        />
      </View>
    );
  }
}
