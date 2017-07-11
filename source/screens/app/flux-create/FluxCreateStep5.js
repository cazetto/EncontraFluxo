import React, {Component} from 'react';
import { Redirect } from 'react-router';
import {StyleSheet, View, Text, Dimensions, Platform} from 'react-native';
import styles from './styles';

export default class FluxCreateStep5 extends Component {
  state = {
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Complete</Text>
      </View>
    );
  }
}
