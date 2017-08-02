import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Route } from 'react-router-native';

import SideMenuHOC from './components/side-menu/SideMenuHOC';
import Header from './components/header/Header';
import PrivateRoute from './components/private-route/PrivateRoute';

import Neighborhoods from './screens/app/neighborhoods/Neighborhoods';
import Interests from './screens/app/interests/Interests';
import Skills from './screens/app/skills/Skills';
import Dashboard from './screens/app/dashboard/Dashboard';
import FluxPreview from './screens/app/flux-preview/FluxPreview';
import FluxJoin from './screens/app/flux-join/FluxJoin';
import FluxCongrats from './screens/app/flux-congrats/FluxCongrats';
import About from './screens/app/about/About';

import FluxCreateStep1 from './screens/app/flux-create/FluxCreateStep1';
import FluxCreateStep2 from './screens/app/flux-create/FluxCreateStep2';
import FluxCreateStep3 from './screens/app/flux-create/FluxCreateStep3';
import FluxCreateStep4 from './screens/app/flux-create/FluxCreateStep4';
import FluxCreateStep5 from './screens/app/flux-create/FluxCreateStep5';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    height: '100%',
  },
});

const App = props => (
  <View style={styles.container}>
    <Header {...props} />
    <PrivateRoute path="/app/neighborhoods" component={Neighborhoods} />
    <PrivateRoute path="/app/skills" component={Skills} />
    <PrivateRoute path="/app/interests" component={Interests} />
    <PrivateRoute path="/app/dashboard" component={Dashboard} />
    <PrivateRoute path="/app/flux-preview/:id" component={FluxPreview} />
    <PrivateRoute path="/app/flux-join/:id" component={FluxJoin} />
    <PrivateRoute path="/app/flux-congrats" component={FluxCongrats} />
    <PrivateRoute path="/app/about" component={About} />
    <PrivateRoute exact path="/app/flux-create-step-1" component={FluxCreateStep1} />
    <PrivateRoute exact path="/app/flux-create-step-2" component={FluxCreateStep2} />
    <PrivateRoute exact path="/app/flux-create-step-3" component={FluxCreateStep3} />
    <PrivateRoute exact path="/app/flux-create-step-4" component={FluxCreateStep4} />
    <PrivateRoute exact path="/app/flux-create-step-5" component={FluxCreateStep5} />
  </View>
);

export default SideMenuHOC(App);
