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
  Platform,
} from 'react-native';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

import UserService from '../../../services/UserService';
import InterestService from '../../../services/InterestService';

export default class Interests extends Component {

  state = {
    interests: [],
  };

  componentWillMount() {
    this.fetchInterests();
  }

  fetchInterests() {
    InterestService.find({ limit: 0 })
    .then(({objects:interests}) => {
      this.setState({interests});
      this.fetchUserProfile();
    })
    .catch(error => {});
  }

  fetchUserProfile() {
    UserService.get()
    .then(({interesses:userInterests}) => {
      var interests = this.state.interests.map(interest => {
        interest.selected = userInterests.some(userInterest => interest.id == userInterest.id);
        return interest;
      });
      this.setState({interests});
    })
    .catch(error => {});
  }

  removeInterest() {
  }

  selectItem(index, value) {
    console.log(value);
    let interests = this.state.interests.slice();
    let current = interests[index].selected = value;
    this.setState({interests});

    let userInterests = interests.filter(interest => {
      return interest.selected;
    });

    UserService.update({interesses: userInterests})
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  renderInterests() {
    return this.state.interests.map((interest, index) => {
      return (
        <View style={styles.listItem} key={index}>
          <Text style={styles.title}>{interest.nome}</Text>
          <Switch
            onValueChange={value => this.selectItem(index, value)}
            value={ interest.selected } />
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

        <TouchableRedirectorWrapper path="/app/dashboard" content={
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
    flex: 1,
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
    backgroundColor: '#455A64',
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
