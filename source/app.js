import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeRouter, Route, Redirect } from 'react-router-native';

import PrivateRoute from './components/private-route/PrivateRoute';
import SideMenuHOC from './components/side-menu/SideMenuHOC';
import Header from './components/header/Header';

import Interests from './screens/app/interests/Interests';
import Skills from './screens/app/skills/Skills';
import Events from './screens/app/events/Events';
import Dashboard from './screens/app/dashboard/Dashboard';
import FluxPreview from './screens/app/flux-preview/FluxPreview';
import FluxCongrats from './screens/app/flux-congrats/FluxCongrats';
import FluxCreate from './screens/app/flux-create/FluxCreate';

import { withRouter } from 'react-router';

const App = props => (
  <View style={styles.app}>
    <NativeRouter>
      <View>
        <Header toggleSideMenu={props.toggleSideMenu} />
        <PrivateRoute exact path="/skills" component={Skills} />
        <PrivateRoute exact path="/interests" component={Interests} />
        <PrivateRoute exact path="/events" component={Events} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/flux/create" component={FluxCreate} />
        <PrivateRoute exact path="/flux/congrats" component={FluxCongrats} />
        <PrivateRoute exact path="/flux/:id" component={FluxPreview} />
        <Route exact path="/" render={() => <Redirect to="/interests"/>  }/>
      </View>
    </NativeRouter>
  </View>
);

{/* <Route exact path="/" render={() =>
  props.location.state && props.location.state.fromSignup ?
    <Redirect to="/skills"/> :
    <Redirect to="/dashboard"/> }/> */}


export default SideMenuHOC( withRouter (App) );

const styles = StyleSheet.create({
  app: {
    backgroundColor: '#FFF',
    height: '100%',
  },
});
