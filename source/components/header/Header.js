import React, { Component } from 'react';

import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { withRouter } from 'react-router';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

const headerRoutesConfig = {
  '/': { title: '' },
  '/dashboard': { title: 'DASHBOARD' },
  '/skills': { title: 'COMPLETE SEU PERFIL' },
  '/interests': { title: 'COMPLETE SEU PERFIL' },
  '/flux-create-step-1': { title: 'CRIANDO UM FLUXO' },
  '/flux-create-step-2': { title: 'INFORME AS HABILIDADES' },
  '/flux-create-step-3': { title: 'INFORME OS MATERIAIS' },
  '/flux-create-step-4': { title: 'INFORME OS INTERESSES' },
  '/flux-create-step-5': { title: 'PARABÉNS' },
  '/flux-preview': { title: 'VISUALIZAR' },
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

  openDrawer() {
    this.props.toggleSideMenu();

    console.log('openDrawer', this.props);
  }

  render() {
    console.log(this.props.location);
    
    if(this.lastLocation != this.props.location.pathname) this.props.toggleSideMenu();
    this.lastLocation = this.props.location.pathname;

    // implementar regex
    const title = headerRoutesConfig[this.props.location.pathname] ? headerRoutesConfig[this.props.location.pathname].title : ' ';

    return (
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <TouchableOpacity onPress={()=>{this.openDrawer()}}>
            <Icon name="menu" style={styles.menuIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.middeColumn}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightColumn}>
        </View>
      </View>
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
    padding: 10,
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
    fontSize: 30,
    color: '#FFF',
  },

  title: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 6,
  }
});
