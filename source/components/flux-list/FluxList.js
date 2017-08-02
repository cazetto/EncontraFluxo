import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Dimensions, ActivityIndicator } from 'react-native';

import FluxListItem from '../flux-list-item/FluxListItem';

export default class FluxList extends Component {

  renderItems() {
    let items = this.props.items;
    return !items ? <ActivityIndicator style={styles.activityIndicator} /> :
    items.length == 0 ? <Text style={styles.noneItems}>Não há nenhum fluxo aqui!</Text> :
    items.map(item => {
      return <FluxListItem key={item.id} data={item} />;
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
    marginTop: '50%',
  },
  noneItems: {
    textAlign: 'center',
    marginTop: '50%',
    color: '#37474F',
  }
});
