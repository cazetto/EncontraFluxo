import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';

import BarMenu from '../../common/components/bar-menu';

import Icon from 'react-native-vector-icons/FontAwesome';

import { CheckBox } from 'react-native-elements';

export default class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: props.filter,
      all: [
        {title: 'Festa', description: 'Festa Junina no parque', image:'', active: false},
        {title: 'Aula de Dança', description: 'Danca de ballet', image:'', active: false},
        {title: 'Aulas de espanhol', description: 'Espanhol para iniciantes', image:'', active: false},
        {title: 'Construção', description: 'Buracos em calçada', image:'', active: false},
      ],
      mine: [
        {title: 'Festa', description: 'Danca de ballet', image:'', active: false},
        {title: 'Aulas de espanhol', description: 'Espanhol para iniciantes', image:'', active: false},
      ]
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({

    });
  }

  selectItem(index, value) {
    let events = this.state[this.state.filter];
    let current = events[index].active = !events[index].active;
    this.setState({[`${this.state.filter}`]:events});
  }

  renderEvents() {
    return this.state[this.state.filter].map((event, index) => {
      return (
        <View style={styles.listItem} key={index}>
          <View style={styles.x}>
            <View>
              <Image source={require('../../assets/images/events/icons/colaborador.png')} style={styles.avatar} />
            </View>
            <View>
              <Text>{event.title}</Text>
              <Text>{event.description}</Text>
            </View>
          </View>
          <CheckBox checked={event.active} onPress={() => { this.selectItem(index, event); }} containerStyle={{backgroundColor: 'transparent', borderWidth: 0}} />
        </View>
      );
    });
  }

  render() {
    return (
      <View style={styles.list}>
        {this.renderEvents()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {

  },
  listItem: {
    paddingTop: 20,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    width: 375,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF1',
  },
  avatar: {
    marginTop: 2,
    marginBottom: 8,

    marginLeft: 2,
    marginRight: 8,
    width: 30,
    height: 30,
  },

  x: {
    flexDirection: 'row',
    width: 310,
  }
});
