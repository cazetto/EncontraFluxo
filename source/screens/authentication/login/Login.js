// React imports
import React, { Component } from 'react';

// React Native imports
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

// Other vendors imports
import { Redirect } from 'react-router-native';
import update from 'immutability-helper';
import _ from 'lodash';
import Toast from 'react-native-easy-toast';

// Custom components
import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

// Shared styles
import styles from '../styles';

// Services import
// import User from '../../api/User';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: 'cazetto.andre@gmail.com',
        password: 'andrewelight',
        // username: '',
        // password: '',
      },
      isFetching: false,
      loginComplete: false,
    };
  }

  componentWillMount() {
    // User.tryLastLogin()
    // .then(() => this.loginSuccess())
    // .catch(() => {});
  }

  componentDidMount() {
    // Temp
    // this.loginSuccess();
  }

  login() {
    this.setState({isFetching: true});
    this.loginSuccess(2000);
    // User.doLogin(this.state.credentials)
    // .then(response => {this.loginSuccess(1000)})
    // .catch(error => {this.loginFail()});
  }

  loginSuccess(wait) {
    if(wait < 2000) wait = 2000;
    if(!wait) this.setState({loginComplete: true, isFetching: false});
    else {
      this.refs.toast.show('Login efetuado!');
      this.setState({isFetching: false});

      const delay = setTimeout(() => {
        clearTimeout(delay);
        this.setState({loginComplete: true});

      }, wait);
    }
  }

  loginFail() {
    this.setState({isFetching: false});
    this.refs.toast.show('Dados incorretos!');
  }

  delayedChangeCredentials(field) {
    return (
      _.debounce(value => {
        let credentials = update(this.state.credentials, {$merge: {[field]:value}});
        this.setState({credentials});
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

  renderRegisterButton() {
    return !this.state.isFetching ? (
      <TouchableRedirectorWrapper path="/auth/signup" content={
        <View style={[styles.touchable, styles.registerButtonColor]}>
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
      this.state.loginComplete ? <Redirect to="/app" /> :
      <View style={styles.content}>

        <View style={[styles.textInputs]}>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="E-mail"
              defaultValue={this.state.credentials.username}
              onChangeText={this.delayedChangeCredentials('username')}
              keyboardType="email-address"
              selectTextOnFocus
              underlineColorAndroid="transparent"
              style={styles.textInput}
            />
          </View>

          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="Senha"
              defaultValue={this.state.credentials.password}
              onChangeText={this.delayedChangeCredentials('password')}
              secureTextEntry
              selectTextOnFocus
              underlineColorAndroid="transparent"
              style={styles.textInput}
            />
          </View>
        </View>

        <View style={styles.actions}>
          {this.renderLoginButton()}
          {this.renderRegisterButton()}
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
