import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Route, Link } from 'react-router-native';

import Login from './screens/auth/login/Login.js';
import Signup from './screens/auth/signup/Signup.js';
import Forgot from './screens/auth/forgot/Forgot.js';

import backgroundImage from './assets/images/authentication/background.jpg';

export default () => (
  <Image source={backgroundImage} style={styles.backgroundImage}>
    <Route path="/auth/login" component={Login} />
    <Route path="/auth/signup" component={Signup} />
    <Route path="/auth/forgot" component={Forgot} />
  </Image>
);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});
