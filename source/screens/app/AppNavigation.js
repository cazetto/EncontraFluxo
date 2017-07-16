import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Route, Redirect } from 'react-router-native';

import SideMenuHOC from '../../components/side-menu/SideMenuHOC';
import Header from '../../components/header/Header';
import PrivateRoute from '../../components/private-route/PrivateRoute';

import Interests from '../../screens/app/interests/Interests';
import Skills from '../../screens/app/skills/Skills';
import Events from '../../screens/app/events/Events';
import Dashboard from '../../screens/app/dashboard/Dashboard';
import FluxPreview from '../../screens/app/flux-preview/FluxPreview';
import FluxJoin from '../../screens/app/flux-join/FluxJoin';
import FluxCongrats from '../../screens/app/flux-congrats/FluxCongrats';

import FluxCreateStep1 from '../../screens/app/flux-create/FluxCreateStep1';
import FluxCreateStep2 from '../../screens/app/flux-create/FluxCreateStep2';
import FluxCreateStep3 from '../../screens/app/flux-create/FluxCreateStep3';
import FluxCreateStep4 from '../../screens/app/flux-create/FluxCreateStep4';
import FluxCreateStep5 from '../../screens/app/flux-create/FluxCreateStep5';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    height: '100%',
  },
});

const AppNavigation = props => {
  return (
    <View style={styles.container}>
      <Header {...props} />
      <PrivateRoute exact path="/skills" component={Skills} />
      <PrivateRoute exact path="/interests" component={Interests} />
      <PrivateRoute exact path="/events" component={Events} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/flux-preview/:id" component={FluxPreview} />
      <PrivateRoute exact path="/flux-join/:id" component={FluxJoin} />
      <PrivateRoute exact path="/flux-congrats" component={FluxCongrats} />
      <PrivateRoute exact path="/flux-create-step-1" component={FluxCreateStep1} />
      <PrivateRoute exact path="/flux-create-step-2" component={FluxCreateStep2} />
      <PrivateRoute exact path="/flux-create-step-3" component={FluxCreateStep3} />
      <PrivateRoute exact path="/flux-create-step-4" component={FluxCreateStep4} />
      <PrivateRoute exact path="/flux-create-step-5" component={FluxCreateStep5} />
      <Route exact path="/" render={() => <Redirect to="/dashboard"/>  }/>
    </View>
  );
}

// toggleSideMenu={() => {props.toggleSideMenu()}}

{/* <Route exact path="/" render={() =>
  props.location.state && props.location.state.fromSignup ?
    <Redirect to="/skills"/> :
    <Redirect to="/dashboard"/> }/> */}

export default SideMenuHOC(AppNavigation);
