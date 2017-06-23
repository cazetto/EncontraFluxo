import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Link } from 'react-router-native';

export default class Forgot extends Component {
  render() {
    return (
      <View>
        <Text style={{marginLeft: 14, fontSize: 20}}>FORGOT</Text>
        <View>
          <Link exact to="/auth/login">
            <Text style={{marginLeft: 14, fontSize: 14, color: '#1976D2'}}>Got to login</Text>
          </Link>
          <Link exact to="/auth/signup">
            <Text style={{marginLeft: 14, fontSize: 14, color: '#1976D2'}}>Go to signup</Text>
          </Link>
        </View>
      </View>
    );
  }
}
