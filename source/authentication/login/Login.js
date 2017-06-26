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
import RedirectionWrapper from '../../components/redirection-wrapper/RedirectionWrapper';

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

  login() {
    this.setState({isFetching: true});
    this.loginSuccess(1000);
    // User.doLogin(this.state.credentials)
    // .then(response => {this.loginSuccess(1000)})
    // .catch(error => {this.loginFail()});
  }

  loginSuccess(wait) {
    this.toast.show('Login efetuado!');
    if(!wait) this.setState({loginComplete: true, isFetching: false});
    else {
      const delay = setTimeout(() => {
        clearTimeout(delay);
        this.setState({loginComplete: true, isFetching: false});
      }, wait);
    }
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
      <RedirectionWrapper path="/auth/signup" content={
        <View style={[styles.touchable, styles.registerButtonColor]}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </View>
      } />
    ) : null;
  }

  renderForgotPasswordButton() {
    return !this.state.isFetching ? (
      <RedirectionWrapper path="/auth/forgot" content={
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
          ref={(c) => { this.toast = c; }}
          style={styles.toast}
          position='top'
          positionValue={155}
          fadeInDuration={750}
          fadeOutDuration={1000}
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
  loginButtonColor: {
    backgroundColor: '#03A9F4',
  },
  registerButtonColor: {
    backgroundColor: '#FBC02D',
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
  toast: {
    backgroundColor:'#d32f2f',
  }
});
