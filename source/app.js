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
import FluxJoin from './screens/app/flux-join/FluxJoin';

import FluxCreateStep1 from './screens/app/flux-create/FluxCreateStep1';
import FluxCreateStep2 from './screens/app/flux-create/FluxCreateStep2';
import FluxCreateStep3 from './screens/app/flux-create/FluxCreateStep3';
import FluxCreateStep4 from './screens/app/flux-create/FluxCreateStep4';
import FluxCreateStep5 from './screens/app/flux-create/FluxCreateStep5';

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
        <PrivateRoute exact path="/flux-preview/:id" component={FluxPreview} />
        <PrivateRoute exact path="/flux-join/:id" component={FluxJoin} />

        <PrivateRoute exact path="/flux-create-step-1" component={FluxCreateStep1} />
        <PrivateRoute exact path="/flux-create-step-2" component={FluxCreateStep2} />
        <PrivateRoute exact path="/flux-create-step-3" component={FluxCreateStep3} />
        <PrivateRoute exact path="/flux-create-step-4" component={FluxCreateStep4} />
        <PrivateRoute exact path="/flux-create-step-5" component={FluxCreateStep5} />

        <Route exact path="/" render={() => <Redirect to="/flux-preview/4"/>  }/>

      </View>
    </NativeRouter>
  </View>
);

{/* <PrivateRoute exact path="/flux/congrats" component={FluxCongrats} />
<PrivateRoute exact path="/flux/:id" component={FluxPreview} /> */}

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
