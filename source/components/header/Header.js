import React, { Component } from 'react';

import { Platform, StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { withRouter } from 'react-router';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

const headerRoutesConfig = {
  '/app/': { title: '' },
  '/app/dashboard': { title: 'FLUXOS' },
  '/app/skills': { title: 'COMPLETE SEU PERFIL' },
  '/app/interests': { title: 'COMPLETE SEU PERFIL' },
  '/app/flux-create-step-1': { title: 'CRIANDO UM FLUXO' },
  '/app/flux-create-step-2': { title: 'INFORME AS HABILIDADES' },
  '/app/flux-create-step-3': { title: 'INFORME OS MATERIAIS' },
  '/app/flux-create-step-4': { title: 'INFORME OS INTERESSES' },
  '/app/flux-create-step-5': { title: 'CRIANDO UM FLUXO' },
  '/app/flux-preview': { title: 'VISUALIZAR FLUXO' },
  '/app/flux-join': { title: 'COLABORAR COM ESTE FLUXO' },
  '/app/about': { title: 'SOBRE' },
}

class Header extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.lastLocation = null;
  }

  back() {
    this.props.history.goBack();
  }

  render() {
    let pathname = this.props.location.pathname;

    let key =
    (/app\/flux-preview\/*/).exec(pathname) ? '/app/flux-preview' :
    (/app\/flux-join\/*/).exec(pathname) ? '/app/flux-join' :
    pathname;

    const title = headerRoutesConfig[key] ? headerRoutesConfig[key].title : ' ';

    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <View style={styles.container}>
          <View style={styles.leftColumn}>
            <TouchableOpacity onPress={()=>{this.props.toggleSideMenu()}}>
              <Icon name="menu" style={styles.menuIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.middeColumn}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.rightColumn}>
            <TouchableOpacity onPress={()=>{this.back()}}>
              <Icon name="arrow-back" style={styles.backIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default withRouter(Header);

// const PADDING_TOP_OS = { ios: 20, android: 20 };
// paddingTop: PADDING_TOP_OS[Platform.OS] || PADDING_TOP_OS.ios,
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#263238',
    padding: 6,
    marginTop: Platform.OS === 'ios' ? 21 : 0,
  },
  leftColumn: {
    flex: 1,
  },

  middeColumn: {
    flex: 10,
  },

  rightColumn: {
    flex: 1,
  },

  menuIcon: {
    fontSize: 27,
    marginLeft: 6,
    color: '#FFF',
  },

  backIcon: {
    marginTop: 2,
    fontSize: 23,
    color: '#FFF',
  },

  title: {
    color: '#FFF',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
  }
});
