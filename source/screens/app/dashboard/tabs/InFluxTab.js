import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import FluxList from '../../../../components/flux-list/FluxList';

export default class InFluxTab extends PureComponent {

  render() {
    return (
      <View style={styles.container}>
        <FluxList items={this.props.route.events} color="#7CB342"></FluxList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderColor: '#7CB342',
  },
});
