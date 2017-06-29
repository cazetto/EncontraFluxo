import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions
} from 'react-native';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

export default class FluxCongrats extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Tela que será exibida após criar um fluxo e após escolher participar de um fluxo</Text>
        <TouchableRedirectorWrapper path="/create" content={
          <View style={styles.btnActionDone}>
            <Text style={styles.btnActionDoneText}>ENTRAR NESSE FLUXO - Flux Congrats</Text>
          </View>
        } />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 70,
  },
  btnActionDone: {
    backgroundColor: '#A1887F',
    padding: 8,
    margin: 3,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  btnActionDoneText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
    padding: 4
  }
});
