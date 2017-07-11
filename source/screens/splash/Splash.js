import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Redirect, withRouter } from 'react-router-native';

import TimerMixin from 'react-timer-mixin';

import { getSavedUser, removeSavedUser } from '../../utils/AuthUtils';

import APIService from '../../services/APIService';
import UserService from '../../services/UserService';
import { APPLICATION_API_CONFIG } from '../../services/config';

export default class Splash extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      redirectionTimeoutCompleted: false,
      redirectionRoute: null,
    };
  }

  componentWillMount() {
    // removeSavedUser();
    getSavedUser()
    .then(response => {
      console.log(APPLICATION_API_CONFIG.name, response.username, response.api_key);
      APIService.authorize(APPLICATION_API_CONFIG.name, response.username, response.api_key);
      UserService.id = response.id;
      console.log('USERID', response.id);
      this.setState({redirectionRoute: '/app'});
    })
    .catch(error => {
      this.setState({redirectionRoute: '/auth/login'});
    });
  }

  componentDidMount() {
    const WAIT = 0;
    this.timer = TimerMixin.setTimeout(() => {
      this.setState({redirectionTimeoutCompleted: true});
    }, WAIT);
  }

  componentWillUnmount() {
    TimerMixin.clearTimeout(this.timer);
  }

  render() {
    let { redirectionTimeoutCompleted, redirectionRoute:pathname } = this.state;

    return (
      (redirectionTimeoutCompleted && pathname) ? (
        <Redirect to={pathname} />
      ) : (
        <View>
          <Text style={{marginLeft: 14, marginTop: 30, fontSize: 30}}>Splash Screen</Text>
        </View>
      )
    );
  }
}
