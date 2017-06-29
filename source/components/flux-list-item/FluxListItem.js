import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default FluxListItem = props => {
  return (
    <View style={styles.container}>
      <View style={styles.col1}>
        <View style={styles.header}>
          <View style={[styles.bullet, {backgroundColor: props.color}]}></View>
          <Text style={styles.title}>TÍTULO DO FLUXO</Text>
        </View>
        <Text style={styles.neighborhood}>Bairro: Nova Iguaçu</Text>
        <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis...</Text>
        <View style={styles.info}>
          <Text style={styles.peopleCount}>32 pessoas contectadas</Text>
          <Text style={styles.createdAt}>Data: 01/07/2017</Text>
        </View>
      </View>
      <View style={styles.col2}>
        <Icon name='md-arrow-dropright' style={[styles.arrowIcon, {color: props.color}]}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    paddingRight: 25,
    borderBottomWidth: 2,
    borderBottomColor: '#EEEEEE'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    width: 12,
    height: 12,
    borderRadius: 12,
    marginRight: 6,
    backgroundColor: '#8BC34A',
  },
  title: {
    color: '#616161',
    fontWeight: 'bold',
  },
  neighborhood: {
    marginTop: 8,
    color: '#424242',
  },
  description: {
    marginTop: 8,
    color: '#424242',
  },
  info: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  peopleCount: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#424242',
  },
  createdAt: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#424242',
  },

  col1: {
    paddingRight: 10,
  },
  col2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 60,
  }
});
