import React, { Component } from 'react';
import { View, Text, } from 'react-native';

import { SideMenu, List, ListItem } from 'react-native-elements';

import Menu from './Menu';

export default SideMenuHOC = Composed =>
class SideMenuComposed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }

  onSideMenuChange(isOpen) {
    this.setState({
      isOpen: isOpen,
    });
  }

  toggleSideMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <SideMenu
        isOpen={this.state.isOpen}
        onChange={this.onSideMenuChange.bind(this)}
        menu={Menu}>
        <Composed toggleSideMenu={this.toggleSideMenu.bind(this)} />
      </SideMenu>
    )
  }
}
