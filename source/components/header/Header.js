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
}

class Header extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  openDrawer() {
    this.props.toggleSideMenu();
  }

  render() {

    console.log(this.props.location);

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
    backgroundColor: '#3E2723',
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
