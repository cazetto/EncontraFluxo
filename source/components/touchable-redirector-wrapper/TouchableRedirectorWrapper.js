import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class TouchableRedirectorWrapper extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    content: PropTypes.any.isRequired
  }

  pressHandle() {
    const { history, path } = this.props
    history.push(path);
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
