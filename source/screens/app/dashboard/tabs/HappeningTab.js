import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import FluxList from '../../../../components/flux-list/FluxList';

export default class HappeningTab extends PureComponent {

  render() {
    return (
      <View style={styles.container}>
        <FluxList items={this.props.route.events} color="#1E88E5"></FluxList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderColor: '#1E88E5',
  },
});
