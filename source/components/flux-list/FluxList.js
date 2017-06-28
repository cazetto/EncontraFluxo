import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Dimensions } from 'react-native';

import FluxListItem from '../flux-list-item/FluxListItem';

export default Opened = props => {
  return (
    <ScrollView style={styles.container}>
      <FluxListItem color={props.color} />
      <FluxListItem color={props.color} />
      <FluxListItem color={props.color} />
      <FluxListItem color={props.color} />
      <FluxListItem color={props.color} />
      <FluxListItem color={props.color} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderTopWidth: 1,
    // borderColor: '#FDD835',
  },
});
