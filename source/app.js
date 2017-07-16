import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeRouter } from 'react-router-native';

import AppNavigation from './screens/app/AppNavigation';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NativeRouter>
          <AppNavigation />
        </NativeRouter>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    height: '100%',
  },
});
