import React, {Component} from 'react';
import { Redirect } from 'react-router';
import {StyleSheet, View, Text, Dimensions, Platform} from 'react-native';
import styles from './styles';

import EventService from '../../../services/EventService';

export default class FluxCreateStep5 extends Component {
  state = {
  }
  componentWillMount() {
    EventService.save()
    .then(response => {
      console.log(response);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Complete</Text>
      </View>
    );
  }
}
