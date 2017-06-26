import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Icon,
  Switch,
  ScrollView
} from 'react-native';
import BarMenu from '../../common/components/bar-menu';

export default class ProfileInterests extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'Interesses',
      interests: [
        {title: 'Festa Junina', active: false},
        {title: 'Aulas de espanhol', active: false},
        {title: 'Aulas de pilates', active: false},
        {title: 'Festa da cidade', active: false},
        {title: 'Artes e pintura', active: false},
        {title: 'Plantar arvores', active: false},
      ],
    };
  }

  removeInterest() {
    console.log('remove');
  }

  selectItem(index, value) {
    let interests = this.state.interests;
    let current = interests[index].active = value;
    this.setState({interests});
  }

  renderInterests() {
    return this.state.interests.map((interest, index) => {
      return (
        <View style={styles.listItem} key={index}>
          <Text>{interest.title}</Text>
          <Switch
            onValueChange={value => this.selectItem(index, value)}
            style={styles.toggle}
            value={ this.state.interests[index].active } />
        </View>
      );
    });
  }

  done() {
    this.props.navigation.navigate('Events');
  }

  render() {
    const { pageTitle } = this.state;
    const { navigation } = this.props;

    return (
      <BarMenu title={pageTitle} navigation={navigation}>
        <ScrollView style={styles.list}>
          {this.renderInterests()}
        </ScrollView>

        <TouchableOpacity onPress={() => { this.done() }} style={styles.btnActionDone}>
          <Text style={styles.btnActionDoneText}>Próximo</Text>
        </TouchableOpacity>
      </BarMenu>
    );
  }

}


const styles = StyleSheet.create({
  listItem: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,

    borderBottomColor: '#ECEFF1',
    backgroundColor: '#FAFAFA',
  },

  toggle: {
    position: 'absolute',
    marginLeft: 320,
    marginTop: 14,
  },

  itemRemoveIconWrapper: {
    position: 'absolute',
    marginLeft: 348,
    marginTop: 10,
  },

  itemRemoveIcon: {
    fontSize: 20,
    color: '#b71c1c'
  },

  btnActionDone: {
    backgroundColor: '#FBC02D',
    padding: 8,
    margin: 3,
    borderRadius: 3,
  },

  btnActionDoneText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
  }

});
