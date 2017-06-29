import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import TouchableRedirectorWrapper from '../touchable-redirector-wrapper/TouchableRedirectorWrapper';

export default FluxListItem = props => {
  return (
    <View style={styles.container}>

      <View style={styles.leftColumn}>
        <View style={styles.header}>
          <View style={[styles.bullet, {backgroundColor: props.color}]}></View>
          <Text style={styles.title}>TÍTULO DO FLUXO</Text>
        </View>
        <Text style={styles.neighborhood}>Bairro: Nova Iguaçu</Text>
        <View>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore facilis nesciunt ducimus itaque dignissimos repellendus, nobis cum debitis maxime consequuntur incidunt repudiandae culpa tempora fuga sit sint, nulla possimus adipisci.
          </Text>

        </View>
        <View style={styles.info}>
          <Text style={styles.peopleCount}>32 pessoas contectadas</Text>
          <Text style={styles.createdAt}>Data: 01/07/2017</Text>
        </View>
      </View>

      <View style={styles.rightColumn}>
        <TouchableRedirectorWrapper path="/flux/1" content={
          <Icon name='md-arrow-dropright' style={[styles.arrowIcon, {color: props.color}]}/>
        } />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#EEEEEE'
  },
  leftColumn: {
    paddingRight: 10,
  },
  rightColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    maxWidth: Dimensions.get('window').width - 70,
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
  arrowIcon: {
    paddingVertical: 20,
    paddingHorizontal: 14,
    fontSize: 50,
  }
});
