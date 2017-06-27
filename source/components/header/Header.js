// React imports
import React, { Component } from 'react';
// React Native imports
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// Other vendors imports
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title
    };
  }

  openDrawer() {
    this.props.toggleSideMenu();
  }

  render() {
    const { title } = this.state;

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

Header.propTypes = {
  title: PropTypes.string.isRequired
};

// const PADDING_TOP_OS = { ios: 20, android: 20 };
// paddingTop: PADDING_TOP_OS[Platform.OS] || PADDING_TOP_OS.ios,
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#3E2723',
    padding: 10,
    marginTop: 21,
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
