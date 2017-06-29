import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import FluxList from '../../../../components/flux-list/FluxList';

export default HappeningTab = () => {
  return (
    <View style={styles.container}>
      <FluxList color="#1E88E5"></FluxList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderColor: '#1E88E5',
  },
});
