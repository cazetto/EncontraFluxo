import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import PrivateRoute from './components/private-route/PrivateRoute';
import SideMenuHOC from './components/side-menu/SideMenuHOC';
import Header from './components/header/Header';

import Interests from './screens/app/interests/Interests';
import Skills from './screens/app/skills/Skills';
import Events from './screens/app/events/Events';
import Dashboard from './screens/app/dashboard/Dashboard';

const App = props => (
  <View style={styles.app}>
    <Header toggleSideMenu={props.toggleSideMenu} title="Header"/>
    <NativeRouter>
      <View>
        <PrivateRoute exact path="/skills" component={Skills} />
        <PrivateRoute exact path="/interests" component={Interests} />
        <PrivateRoute exact path="/events" component={Events} />
        <PrivateRoute exact path="/" component={Dashboard} />
      </View>
    </NativeRouter>
  </View>
);

export default SideMenuHOC(App);

const styles = StyleSheet.create({
  app: {
    backgroundColor: '#FFF',
    height: '100%',
  },
});
