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

export default class Forgot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: '',
      },
      isFetching: false,
      loginComplete: false,
    };
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

  renderForgotButton() {
    return !this.state.isFetching ? (
      <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {this.login()}}
      style={[styles.touchable, styles.forgotButtonColor]}
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

        </View>

        <View style={styles.actions}>
          {this.renderForgotButton()}
          {this.renderBack()}
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
