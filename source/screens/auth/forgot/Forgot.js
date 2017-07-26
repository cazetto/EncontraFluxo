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
import AuthService from '../../../services/AuthService';

export default class Forgot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
      },
      isFetching: false,
      loginComplete: false,
    };
  }

  delayedChangeCredentials(field) {
    return (
      _.debounce(value => {
        let data = update(this.state.data, {$merge: {[field]:value}});
        this.setState({data});
      }, 100)
    );
  }

  forgot() {
    this.setState({isFetching: true});
    AuthService.forgot(this.state.data)
    .then(response => {
      this.refs.toast.show(`Senha enviada para: \n${this.state.data.email}`, 1000);
      this.setState({data: {email: ''}, isFetching: false});
      const delay = setTimeout(() => {
        clearTimeout(delay);
        this.setState({forgotComplete: true});
      }, 2000);
    })
    .catch(error => {
      this.refs.toast.show(`Erro ao recuperar senha!`, 1000);
      this.setState({data: {email: ''}, isFetching: false});
    })
  }

  renderForgotButton() {
    return !this.state.isFetching ? (
      <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {this.forgot()}}
      style={[styles.touchable, styles.forgotButtonColor]}
      >
        <Text style={styles.buttonText}>Recuperar senha</Text>
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
    if(this.state.data.email) this.forgot();
  }

  render() {
    return (
      this.state.forgotComplete ? <Redirect to="/auth/login" /> :
      <View style={styles.content}>
        <View style={[styles.textInputs]}>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="E-mail"
              defaultValue={this.state.data.email}
              onChangeText={this.delayedChangeCredentials('email')}
              keyboardType="email-address"
              selectTextOnFocus
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              blurOnSubmit={true}
              onSubmitEditing={() => {this.done()}}
              style={styles.textInput}
            />
          </View>
        </View>
        <View style={styles.actions}>
          {this.renderForgotButton()}
          {this.renderBack()}
        </View>
        <Toast
          ref="toast"
          style={styles.toast}
          position="top"
          positionValue={-50}
          fadeInDuration={750}
          fadeOutDuration={750}
          opacity={0.8}
        />
      </View>
    );
  }
}
