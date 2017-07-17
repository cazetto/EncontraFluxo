import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import UserService from '../../services/UserService';

import TouchableRedirectorWrapper from '../touchable-redirector-wrapper/TouchableRedirectorWrapper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1',
    paddingTop: 21,
    width: '110%',
  },
  userName: {
    padding: 14,
    height: 50,
    fontSize: 18,
    textAlign: 'left',
    backgroundColor: '#263238',
    color: '#ECEFF1',
  },
  list: {

  },
  listItem: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    backgroundColor: '#ECEFF1',
  },
  listItemText: {
    color: '#455A64',
    fontSize: 15,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#CFD8DC',
  }

});

export default Menu = () => {
  let userName = UserService.user ? UserService.user.nome : '';
  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{userName}</Text>
      <View style={styles.list}>

        <TouchableRedirectorWrapper path="/app/dashboard" content={
          <View style={styles.listItem}>
            <Text style={styles.listItemText}> > Dashboard</Text>
          </View>
        } />
        <View style={styles.divider} />

        <TouchableRedirectorWrapper path="/app/skills" content={
          <View style={styles.listItem}>
            <Text style={styles.listItemText}> > Habilidades</Text>
          </View>
        } />
        <View style={styles.divider} />

        <TouchableRedirectorWrapper path="/app/interests" content={
          <View style={styles.listItem}>
            <Text style={styles.listItemText}> > Interesses</Text>
          </View>
        } />
        <View style={styles.divider} />

        <TouchableRedirectorWrapper path="/app/flux-create-step-1" content={
          <View style={styles.listItem}>
            <Text style={styles.listItemText}> > Criar Fluxo</Text>
          </View>
        } />
        <View style={styles.divider} />

        <TouchableRedirectorWrapper path="/auth/logout" content={
          <View style={styles.listItem}>
            <Text style={styles.listItemText}> > Sair</Text>
          </View>
        } />
        <View style={styles.divider} />

      </View>
    </View>
  );
}
