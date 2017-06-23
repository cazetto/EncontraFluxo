import React from 'react';
import { View, Text } from 'react-native';
import { Route, Link } from 'react-router-native';

import Login from './login/Login.js';
import Signup from './signup/Signup.js';
import Forgot from './forgot/Forgot.js';

export default () => (
  <View>
    <Text style={{marginLeft: 14, marginTop: 30, fontSize: 30}}>AUTH</Text>
    <Route exact path="/auth/login" component={Login} />
    <Route exact path="/auth/signup" component={Signup} />
    <Route exact path="/auth/forgot" component={Forgot} />
  </View>
);
