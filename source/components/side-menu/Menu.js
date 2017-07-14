import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import UserService from '../../services/UserService';

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
    fontSize: 18,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#CFD8DC',
  }

});

export default Menu = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{UserService.user.nome}</Text>
      <View style={styles.list}>

        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listItemText}> > Dashboard</Text>
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listItemText}> > Perfil</Text>
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listItemText}> > Dashboard</Text>
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listItemText}> > Criar Fluxo</Text>
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listItemText}> > Sair</Text>
        </TouchableOpacity>
        <View style={styles.divider} />

      </View>
    </View>
  );
}
