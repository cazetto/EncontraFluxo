import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import FluxList from '../../../../components/flux-list/FluxList';

export default OpenedTab = () => {
  return (
    <View style={styles.container}>
      <FluxList color="#FDD835"></FluxList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderColor: '#FDD835',
  },
});
