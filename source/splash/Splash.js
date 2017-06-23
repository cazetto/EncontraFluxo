import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Redirect, withRouter } from 'react-router-native';

import TimerMixin from 'react-timer-mixin';

const IS_AUTHENTICATED = false;

const checkAuthentication = () => {
  return new Promise((resolve, reject) => {
    resolve(IS_AUTHENTICATED);
  });
}

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
    checkAuthentication()
    .then(isAuthenticated => {
      this.setState({redirectionRoute: isAuthenticated ? '/app' : '/auth/login'});
    });
  }

  componentDidMount() {
    console.log('gomotherfuckingtimer');
    // Try adding more than one second... rs! It's my life!
    // const WAIT = 0;
    // this.timer = TimerMixin.setTimeout(() => {
    //   console.log('waaaaat');
    //   this.setState({redirectionTimeoutCompleted: true});
    // }, WAIT);

    this.setState({redirectionTimeoutCompleted: true});
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
