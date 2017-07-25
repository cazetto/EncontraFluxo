import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';

import UserService from '../../services/UserService';

import TouchableRedirectorWrapper from '../touchable-redirector-wrapper/TouchableRedirectorWrapper';

import Icon from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1',
    paddingTop: Platform.OS === 'ios' ? 21 : 0,
    width: '110%',
  },
  userName: {
    paddingTop: 9,
    paddingHorizontal: 12,
    height: 35,
    fontSize: 15,
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
    fontWeight: '600',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#CFD8DC',
  },
  icon: {
    fontSize: 14,

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
            <Text style={styles.listItemText}> <Icon name="database" style={styles.icon}/>  Fluxos</Text>
          </View>
        } />
        <View style={styles.divider} />

        <TouchableRedirectorWrapper path="/app/skills" content={
          <View style={styles.listItem}>
            <Text style={styles.listItemText}> <Icon name="round-brush" style={styles.icon}/>  Editar Perfil</Text>
          </View>
        } />
        <View style={styles.divider} />

        <TouchableRedirectorWrapper path="/app/flux-create-step-1" content={
          <View style={styles.listItem}>
            <Text style={styles.listItemText}> <Icon name="blackboard" style={styles.icon}/>  Criar Fluxo</Text>
          </View>
        } />
        <View style={styles.divider} />

        <TouchableRedirectorWrapper path="/app/about" content={
          <View style={styles.listItem}>
            <Text style={styles.listItemText}> <Icon name="news" style={styles.icon}/>  Sobre</Text>
          </View>
        } />
        <View style={styles.divider} />

        <TouchableRedirectorWrapper path="/auth/logout" content={
          <View style={styles.listItem}>
            <Text style={styles.listItemText}> <Icon name="back" style={styles.icon}/>  Sair</Text>
          </View>
        } />
        <View style={styles.divider} />

      </View>
    </View>
  );
}
