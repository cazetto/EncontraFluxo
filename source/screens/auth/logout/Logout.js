// React imports
import React, { Component } from 'react';

// React Native imports
import { View, Text } from 'react-native';

// Other vendors imports
import { Redirect } from 'react-router-native';

// Utils imports
import { removeSavedUser } from '../../../utils/AuthUtils';

// Services import
import UserService from '../../../services/UserService';
import APIService from '../../../services/APIService';
import { APPLICATION_API_CONFIG } from '../../../services/config';

export default class Logout extends Component {

  componentWillMount() {
    APIService.init(APPLICATION_API_CONFIG.name, APPLICATION_API_CONFIG.url);
    UserService.reset();
    removeSavedUser();
  }

  render() {
    return (
      <Redirect to="/auth/login" />
    );
  }
}
