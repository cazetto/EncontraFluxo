import React, {Component} from 'react';
import { Redirect } from 'react-router';
import {StyleSheet, View, Text, Image, ActivityIndicator, Dimensions, Platform} from 'react-native';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';
import UserService from '../../../services/UserService';

import balloonBlue from '../../../assets/images/events/balloons/balloon1.png';
import balloonGreen from '../../../assets/images/events/balloons/balloon2.png';
import balloonPink from '../../../assets/images/events/balloons/balloon3.png';
import balloonYellow from '../../../assets/images/events/balloons/balloon4.png';
import balloonOrange from '../../../assets/images/events/balloons/balloon5.png';
// import balloon6 from '../../../assets/images/events/balloons/balloon6.png';

export default class FluxCongrats extends Component {
  state = {
    userName: null,
  }
  componentWillMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    UserService.get()
    .then(({nome:userName}) => this.setState({userName}))
    .catch(error => {
      console.log('Error retrieving user info:', error);
    });
  }

  render() {
    return (
      !this.state.userName ?
      <ActivityIndicator style={styles.activityIndicator} /> :
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.congratsText}>IRADO, { this.state.userName.toUpperCase() }, AGORA VOCÊ ESTÁ NESTE FLUXO!</Text>
          <View style={styles.balloons}>
            <Image resizeMode="contain" style={[styles.balloon, styles.balloonGreen]} source={balloonGreen} />
            <Image resizeMode="contain" style={[styles.balloon, styles.balloonOrange]} source={balloonOrange} />
            <Image resizeMode="contain" style={[styles.balloon, styles.balloonBlue]} source={balloonBlue} />
            <Image resizeMode="contain" style={[styles.balloon, styles.balloonPink]} source={balloonPink} />
            <Image resizeMode="contain" style={[styles.balloon, styles.balloonYellow]} source={balloonYellow} />
          </View>
          <Text style={styles.instructionText}>Agora é só ficar ligado e aguardar este fluxo encontrar todas as pessoas que ele precisa acontecer.</Text>
        </View>
        <TouchableRedirectorWrapper path="/app/dashboard" content={
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
    flex: 1,
    backgroundColor: '#ECEFF1',
  },
  content: {
    height: Dimensions.get('window').height - (Platform.OS === 'ios' ? 108 : 116),
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
    paddingHorizontal: '20%',
  },
  instructionText: {
    position: 'absolute',
    bottom: '25%',
    fontSize: 12,
    paddingLeft: '14%',
    paddingRight: '10%',
    fontWeight: 'bold',
    color: '#37474F',
    textAlign: 'center',
  },
  activityIndicator: {
    marginTop: '50%',
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
    backgroundColor: '#455A64',
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
