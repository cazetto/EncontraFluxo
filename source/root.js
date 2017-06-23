import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import PrivateRoute from './authentication/PrivateRoute';

import Splash from './splash/Splash';
import Authentication from './authentication/index';
import App from './app';

const Root = () => (
  <NativeRouter>
    <View>
      <PrivateRoute exact path="/" component={Splash} />
      <Route path="/auth" component={Authentication} />
      <PrivateRoute path="/app" component={App} />
    </View>
  </NativeRouter>
);

export default Root;
