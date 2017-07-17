import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Dimensions, ActivityIndicator } from 'react-native';

import FluxListItem from '../flux-list-item/FluxListItem';

export default class FluxList extends Component {

  renderItems() {
    let items = this.props.items;
    let color = this.props.color;
    if(!items) return <ActivityIndicator style={styles.activityIndicator} />
    return items.map(item => {
      return <FluxListItem key={item.id} data={item} color={color} />;
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderItems()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // borderTopWidth: 1,
    // borderColor: '#FDD835',
  },
  activityIndicator: {
    marginTop: 20,
  }
});
