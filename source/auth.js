import React from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Route, Link } from 'react-router-native';

import Login from './screens/auth/login/Login.js';
import Logout from './screens/auth/logout/Logout';
import Signup from './screens/auth/signup/Signup.js';
import Forgot from './screens/auth/forgot/Forgot.js';

import logoImage from './assets/images/logo.png';

import APIService from './services/APIService';
import { APPLICATION_API_CONFIG } from './services/config';

APIService.init(APPLICATION_API_CONFIG.name, APPLICATION_API_CONFIG.url);

export default Auth = () => (
  <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/logout" component={Logout} />
      <Route path="/auth/signup" component={Signup} />
      <Route path="/auth/forgot" component={Forgot} />
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455A64',
  },
  logo: {
    width: '100%',
    height: '12%',
    marginTop: '15%',
    marginBottom: '10%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
