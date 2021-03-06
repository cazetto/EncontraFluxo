import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import PrivateRoute from './components/private-route/PrivateRoute';

import Splash from './screens/splash/Splash';
import Authentication from './auth';
import App from './app';

export default Root = () => (
  <NativeRouter>
    <View style={styles.container}>
      <Route exact path="/" component={Splash} />
      <Route path="/auth" component={Authentication} />
      <PrivateRoute path="/app" component={App} />
    </View>
  </NativeRouter>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
});
