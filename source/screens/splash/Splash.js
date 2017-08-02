import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Animated, Easing, } from 'react-native';

import { Redirect, withRouter } from 'react-router-native';

import TimerMixin from 'react-timer-mixin';

import { getSavedUser, removeSavedUser } from '../../utils/AuthUtils';

import APIService from '../../services/APIService';
import UserService from '../../services/UserService';
import { APPLICATION_API_CONFIG } from '../../services/config';

import logoImage from '../../assets/images/logo.png';
import logoWelightImage from '../../assets/images/logo-welight.png';

export default class Splash extends Component {

  state = {
    isAuthenticated: false,
    redirectionTimeoutCompleted: false,
    redirectionRoute: null,

    logoFadeAnim: new Animated.Value(0),
    logoWelightFadeAnim: new Animated.Value(0),
  }

  componentWillMount() {
    // removeSavedUser();
    getSavedUser()
    .then(response => {
      // console.log(APPLICATION_API_CONFIG.name, response.username, response.api_key);
      APIService.authorize(APPLICATION_API_CONFIG.name, response.username, response.api_key);
      UserService.id = response.id;
      UserService.user = response;
      // this.setState({redirectionRoute: '/app/dashboard'});
      this.setState({redirectionRoute: '/app/flux-create-step-2'});
    })
    .catch(error => {
      this.setState({redirectionRoute: '/auth/login'});
    });
  }

  componentDidMount() {
    this.animate();
    // const WAIT = 3000;
    const WAIT = 0;
    this.timer = TimerMixin.setTimeout(() => {
      this.setState({redirectionTimeoutCompleted: true});
    }, WAIT);
  }

  componentWillUnmount() {
    TimerMixin.clearTimeout(this.timer);
  }

  animate() {
    Animated.timing(this.state.logoFadeAnim, {toValue: 1, duration: 1000, }).start();
    Animated.timing(this.state.logoWelightFadeAnim, {toValue: 1, duration: 1000, }).start();
  }

  render() {
    let { logoFadeAnim, logoWelightFadeAnim, redirectionTimeoutCompleted, redirectionRoute:pathname } = this.state;

    return (
      (redirectionTimeoutCompleted && pathname) ? (
        <Redirect to={pathname} />
      ) : (
        <View style={styles.container}>

          <Image source={logoImage} style={styles.logo}></Image>
          <Animated.View style={{ opacity: logoWelightFadeAnim, }}>
            <Image source={logoWelightImage} style={styles.logoWelight}></Image>
          </Animated.View>

        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263238',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
    width: '80%',
  },
  logoWelight: {
    resizeMode: 'contain',
    width: 100,
    marginLeft: 12,
  }
})
