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

  close() {
    this.setState({
      isOpen: false
    })
  }

  render() {
    let menu = Menu();

    return (
      <SideMenu
        isOpen={this.state.isOpen}
        onChange={this.onSideMenuChange.bind(this)}
        menu={menu}>
        <Composed toggleSideMenu={this.toggleSideMenu.bind(this)} />
      </SideMenu>
    )
  }
}
