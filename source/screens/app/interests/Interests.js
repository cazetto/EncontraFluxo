import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Icon,
  Switch,
  Dimensions,
} from 'react-native';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

export default class Interests extends Component {

  constructor(props) {
    super(props);
    this.state = {
      interests: [
        {title: 'Festa Junina', active: false},
        {title: 'Aulas de espanhol', active: false},
        {title: 'Aulas de pilates', active: false},
        {title: 'Festa da cidade', active: false},
        {title: 'Artes e pintura', active: false},
        {title: 'Plantar arvores', active: false},
        {title: 'Festa Junina', active: false},
        {title: 'Aulas de espanhol', active: false},
        {title: 'Aulas de pilates', active: false},
        {title: 'Festa da cidade', active: false},
        {title: 'Artes e pintura', active: false},
        {title: 'Plantar arvores', active: false},
        {title: 'Festa Junina', active: false},
        {title: 'Aulas de espanhol', active: false},
        {title: 'Aulas de pilates', active: false},
        {title: 'Festa da cidade', active: false},
        {title: 'Artes e pintura', active: false},
        {title: 'Plantar arvores', active: false},
        {title: 'Festa Junina', active: false},
        {title: 'Aulas de espanhol', active: false},
        {title: 'Aulas de pilates', active: false},
        {title: 'Festa da cidade', active: false},
        {title: 'Artes e pintura', active: false},
        {title: 'Ultimo', active: false},
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
          <Text style={styles.title}>{interest.title}</Text>
          <Switch
            onValueChange={value => this.selectItem(index, value)}
            value={ this.state.interests[index].active } />
        </View>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderLabel}>SELECIONE SEUS INTERESSES</Text>
        </View>
        <ScrollView>
          {this.renderInterests()}
        </ScrollView>

        <TouchableRedirectorWrapper path="/dashboard" content={
          <View style={styles.btnActionDone}>
            <Text style={styles.btnActionDoneText}>FINALIZAR</Text>
          </View>
        } />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 70,
  },
  listHeader: {
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF1',
    backgroundColor: '#F5F5F5',
  },
  listHeaderLabel: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF1',
    backgroundColor: '#FAFAFA',
  },
  title: {
    color: '#757575',
  },
  btnActionDone: {
    backgroundColor: '#EF6C00',
    padding: 8,
    margin: 3,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  btnActionDoneText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
    padding: 4
  },

});
