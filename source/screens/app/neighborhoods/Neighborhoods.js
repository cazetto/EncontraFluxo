// React imports
import React, { Component } from 'react';
// React Native imports
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
} from 'react-native';

// Other vendors imports
import update from 'immutability-helper';
import Icon from 'react-native-vector-icons/Entypo';

// Custom components imports
import Select from '../../../components/select/Select';
import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

// Services imports
import NeighborhoodService from '../../../services/NeighborhoodService';
import UserService from '../../../services/UserService';

export default class Neighborhoods extends Component {
  state = {
    neighborhoods: [],
    neighborhoodCurrentId: null,
  }

  componentWillMount() {
    this.fetchNeighborhoods();
    var immediateID = setImmediate(() => {
      clearImmediate(immediateID);
      // Authenticated services calls goes here
      this.fetchUserProfile();
    });
  }
  // FETCHES
  fetchNeighborhoods() {
    NeighborhoodService.find()
    .then(({objects}) => {
      let neighborhoods = objects.sort((a, b) => a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0);
      this.setState({neighborhoods});
    });
  }

  fetchUserProfile() {
    UserService.get()
    .then(response => {
      this.setState({neighborhoodCurrentId:response.bairro_id});
    })
    .catch(error => console.log('Error when fetching user profile data.'))
  }

  // HANDLES
  onNeighborhoodSelectHandle(neighborhood) {
    let { id:bairro_id } = neighborhood;
    UserService.update({bairro_id})
    .then(response => {})
    .catch(error => console.log('Error when update user neighborhood.'))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.control}>
          <Text style={styles.selectLabel}>Bairro onde você mora:</Text>
          <View style={styles.select}>
            <Select placeholder="SELECIONE O BAIRRO" options={this.state.neighborhoods} defaultSelectedId={this.state.neighborhoodCurrentId} onSelect={this.onNeighborhoodSelectHandle.bind(this)}></Select>
          </View>
        </View>
        <TouchableRedirectorWrapper path="/app/skills" content={
          <View style={styles.btnActionDone}>
            <Text style={styles.btnActionDoneText}>CONTINUAR</Text>
          </View>
        } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  control: {
    flex: 1,
    marginHorizontal: 10,
  },
  selectLabel: {
    marginTop: 10,
    marginBottom: 4,
    marginLeft: 10,
    color: '#757575',
  },
  select: {
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
  }
});
