import React, { Component } from 'react';
import { View, Text  } from 'react-native';
import { Link } from 'react-router-native';

export default class Login extends Component {
  render() {
    return (
      <View>
        <Text style={{marginLeft: 14, fontSize: 20}}>LOGIN</Text>
        <View>
          <Link exact to="/auth/signup">
            <Text style={{marginLeft: 14, fontSize: 14, color: '#1976D2'}}>Go to signup</Text>
          </Link>
          <Link exact to="/auth/forgot">
            <Text style={{marginLeft: 14, fontSize: 14, color: '#1976D2'}}>Go to forgot</Text>
          </Link>

          <Link exact to="/app">
            <Text style={{marginLeft: 14, fontSize: 14, color: '#1976D2'}}>Enter</Text>
          </Link>

        </View>
      </View>
    );
  }
}
