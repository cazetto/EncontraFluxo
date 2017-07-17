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
        nome: 'André Pesci Cazetto',
        email: 'cazetto.andre@gmail.com',
        senha: '123456',
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
    .then(response => {
      this.signupSuccess(response);
    })
    .catch(error => {this.signupFail(error)});
  }

  signupSuccess(response) {
    // NÃO ESTÁ RETORNANDO O TOKEN DA API!!!
    console.log(APPLICATION_API_CONFIG.name, response.username, response.api_key);
    APIService.authorize(APPLICATION_API_CONFIG.name, response.username, response.api_key);
    this.state.keepMeLoggedIn && saveUser(response);
    UserService.id = response.id;
    UserService.user = response;
    this.refs.toast.show('Cadastrado!');
    const delay = setTimeout(() => {
      clearTimeout(delay);
      this.setState({signupComplete: true});
    }, 1000);
  }

  signupFail(error) {
    this.setState({isFetching: false});
    this.refs.toast.show('Dados incorretos!');
  }

  loginSuccess(wait) {
    this.refs.toast.show('Login efetuado!');
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

  render() {
    return (
      this.state.signupComplete ? <Redirect to="/app/skills" /> :
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
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="E-mail"
              defaultValue={this.state.data.email}
              onChangeText={this.delayedChangeCredentials('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              selectTextOnFocus
              underlineColorAndroid="transparent"
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="Senha"
              defaultValue={this.state.data.senha}
              onChangeText={this.delayedChangeCredentials('senha')}
              secureTextEntry
              selectTextOnFocus
              underlineColorAndroid="transparent"
              style={styles.textInput}
            />
          </View>
          <View style={styles.keepMeLoggedInWrapper}>
            <CheckBox
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
