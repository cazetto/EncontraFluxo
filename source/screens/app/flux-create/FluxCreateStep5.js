import React, {Component} from 'react';
import { Redirect } from 'react-router';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

import EventService from '../../../services/EventService';

import balloonBlue from '../../../assets/images/events/balloons/balloon1.png';
import balloonGreen from '../../../assets/images/events/balloons/balloon2.png';
import balloonPink from '../../../assets/images/events/balloons/balloon3.png';
import balloonYellow from '../../../assets/images/events/balloons/balloon4.png';
import balloonOrange from '../../../assets/images/events/balloons/balloon5.png';
// import balloon6 from '../../../assets/images/events/balloons/balloon6.png';

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
        <View style={styles.content}>
          <Text style={styles.congratsText}>IRADO (NOME), VOCÊ CRIOU UM FLUXO!</Text>
          <View style={styles.balloons}>
            <Image resizeMode="contain" style={[styles.balloon, styles.balloonGreen]} source={balloonGreen} />
            <Image resizeMode="contain" style={[styles.balloon, styles.balloonOrange]} source={balloonOrange} />
            <Image resizeMode="contain" style={[styles.balloon, styles.balloonBlue]} source={balloonBlue} />
            <Image resizeMode="contain" style={[styles.balloon, styles.balloonPink]} source={balloonPink} />
            <Image resizeMode="contain" style={[styles.balloon, styles.balloonYellow]} source={balloonYellow} />
          </View>
          <Text style={styles.instructionText}>Agora divulgue nas redes sociais, convide seus amigos para baixar o app e entrar com você neste fluxo!</Text>


        </View>
        <TouchableRedirectorWrapper path="/dashboard" content={
          <View style={styles.btnActionDone}>
            <Text style={styles.btnActionDoneText}>SHOW!</Text>
          </View>
        } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECEFF1',
  },
  content: {

    height: Dimensions.get('window').height - 120,
  },
  balloon: {
    position: 'absolute',
    width: 80,
    height: 120,
  },

  congratsText: {
    marginTop: 50,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#37474F',
    textAlign: 'center',
  },

  instructionText: {
    position: 'absolute',
    bottom: 140,
    fontSize: 12,
    padding: 20,
    fontWeight: 'bold',
    color: '#37474F',
    textAlign: 'center',
  },

  balloons: {
    position: 'absolute',
    width: 160,
    height: 160,
    marginTop: (Dimensions.get('window').height / 2) - 150,
    marginLeft: (Dimensions.get('window').width / 2) - 86,
  },

  balloonBlue: {
    marginLeft: 40,
    marginTop: 20,
  },
  balloonGreen: {
    marginLeft: 10,
    marginTop: 0,
  },
  balloonPink: {
    marginLeft: 70,
    marginTop: 34,
    transform: [{ rotate: '25deg' }],
  },
  balloonYellow: {
    marginLeft: 4,
    marginTop: 40,
  },
  balloonOrange: {
    marginLeft: 70,
    marginTop: 0,
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
