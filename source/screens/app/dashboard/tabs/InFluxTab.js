import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import FluxList from '../../../../components/flux-list/FluxList';

export default InFluxTab = () => {
  return (
    <View style={styles.container}>
      <FluxList color="#7CB342"></FluxList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderColor: '#7CB342',
  },
});
