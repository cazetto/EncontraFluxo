import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class TouchableRedirectorWrapper extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    content: PropTypes.any.isRequired
  }

  pressHandle() {
    const { history, path, state } = this.props;
    history.push(path, state);
  }

  render() {
    const { history, content } = this.props
    return (
      <View>
        <TouchableOpacity onPress={() => {this.pressHandle()}} activeOpacity={0.5}>
          {content}
        </TouchableOpacity>
      </View>
    )
  }
}

export default withRouter(TouchableRedirectorWrapper);
