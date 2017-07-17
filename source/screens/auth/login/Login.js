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
import { saveUser } from '../../../utils/AuthUtils';

// Services import
import UserService from '../../../services/UserService';
import AuthService from '../../../services/AuthService';
import APIService from '../../../services/APIService';
import { APPLICATION_API_CONFIG } from '../../../services/config';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: 'andre@welight.co',
        password: '123',
        // username: 'cazetto.andre@gmail.com',
        // password: '123456',
        // username: '',
        // password: '',
      },
      keepMeLoggedIn: true,
      isFetching: false,
      loginComplete: false,
    };
  }

  login() {
    this.setState({isFetching: true});
    AuthService.login(this.state.data)
    .then(response => this.loginSuccess(response))
    .catch(error => this.loginFail(error));
  }

  loginSuccess(response) {
    console.log(APPLICATION_API_CONFIG.name, response.username, response.api_key);
    APIService.authorize(APPLICATION_API_CONFIG.name, response.username, response.api_key);
    this.state.keepMeLoggedIn && saveUser(response);
    UserService.id = response.id;
    UserService.user = response;
    this.refs.toast.show('Login efetuado!');
    const delay = setTimeout(() => {
      clearTimeout(delay);
      this.setState({loginComplete: true});
    }, 1000);
  }

  loginFail() {
    this.setState({isFetching: false});
    this.refs.toast.show('Dados incorretos!');
  }

  delayedChangeState(object, field) {
    return (
      _.debounce(value => {
        let data = update(this.state[object], {$merge: {[field]:value}});
        this.setState({data});
      }, 100)
    );
  }

  renderLoginButton() {
    return !this.state.isFetching ? (
      <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {this.login()}}
      style={[styles.touchable, styles.loginButtonColor]}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    ) : (
      <ActivityIndicator
        size="large"
        color="#fff"
        style={styles.loginIndicator}
      />
    );
  }

  renderSignupButton() {
    return !this.state.isFetching ? (
      <TouchableRedirectorWrapper path="/auth/signup" content={
        <View style={[styles.touchable, styles.signupButtonColor]}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </View>
      } />
    ) : null;
  }

  renderForgotPasswordButton() {
    return !this.state.isFetching ? (
      <TouchableRedirectorWrapper path="/auth/forgot" content={
        <View style={[styles.touchable]}>
          <Text style={styles.buttonText}>Recuperar senha</Text>
        </View>
      } />
    ) : null;
  }

  render() {
    return (
      this.state.loginComplete ? <Redirect to="/app/dashboard" /> :
      <View style={styles.content}>

        <View style={[styles.textInputs]}>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="E-mail"
              defaultValue={this.state.data.username}
              onChangeText={this.delayedChangeState('data', 'username')}
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              selectTextOnFocus
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
          </View>

          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="Senha"
              defaultValue={this.state.data.password}
              onChangeText={this.delayedChangeState('data', 'password')}
              secureTextEntry
              selectTextOnFocus
              underlineColorAndroid="transparent"
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
          {this.renderLoginButton()}
          {this.renderSignupButton()}
          {this.renderForgotPasswordButton()}
        </View>

        <Toast
          ref="toast"
          style={styles.toast}
          position="top"
          positionValue={155}
          fadeInDuration={750}
          fadeOutDuration={750}
          opacity={0.8}
        />

      </View>
    );
  }
}
