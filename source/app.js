import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import PrivateRoute from './components/private-route/PrivateRoute';

import Interests from './screens/app/interests/Interests';
import Skills from './screens/app/skills/Skills';
import Events from './screens/app/events/Events';

const App = () => (
  <View>
    <NativeRouter>
      <View>
        <PrivateRoute exact path="/" component={Skills} />
        <PrivateRoute exact path="/interests" component={Interests} />
        <PrivateRoute exact path="/events" component={Events} />
      </View>
    </NativeRouter>
  </View>
);

export default App;
