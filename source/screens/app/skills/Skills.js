// React imports
import React, { Component } from 'react';
// React Native imports
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
import ItemDistributionList from '../../../components/item-distribution-list/ItemDistributionList';

// Services imports
import NeighborhoodService from '../../../services/NeighborhoodService';
import SkillService from '../../../services/SkillService';
import UserService from '../../../services/UserService';

export default class Skills extends Component {
  state = {
    availableSkills: [],
    userSkills: [],

    availableSkills: [],
    userSkills: [],

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
    .then(response => {
      let neighborhoods = response.objects;
      this.setState({neighborhoods});
    });
  }

  fetchSkills() {
    SkillService.find()
    .then(({objects:availableSkills}) => this.setState({availableSkills}))
    .catch(error => console.log('Error when fetching skills.'));
  }

  fetchUserProfile() {
    UserService.get()
    .then(response => {
      this.setState({userSkills: response.habilidades, neighborhoodCurrentId:response.bairro_id});
      this.fetchSkills();
    })
    .catch(error => console.log('Error when fetching user profile data.'))
  }

  // HANDLES
  onNeighborhoodSelectHandle(neighborhood) {
    let { id:bairro_id } = neighborhood;
    UserService.update({bairro_id})
    .then(response => {})
    .catch(error => {});
  }

  onChangeSkillsHandle(addedUserSkills) {
    UserService.update({
      habilidades: addedUserSkills,
    })
    .then(response => {
      console.log('onChangeSkillsHandle:UserService:response', response);
    })
    .catch(error => console.log('Error when update skills in user profile.'))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.control}>
          <Text style={styles.inputLabel}>Local onde você mora:</Text>
          <Select placeholder="SELECIONE O BAIRRO" options={this.state.neighborhoods} defaultSelectedId={this.state.neighborhoodCurrentId} onSelect={this.onNeighborhoodSelectHandle.bind(this)}></Select>
          <Text style={styles.inputLabel}>Suas habilidades:</Text>
          <ItemDistributionList
            available={this.state.availableSkills}
            added={this.state.userSkills}
            onAddedItemsChanged={added => this.onChangeSkillsHandle(added)}
          />
        </View>
        <TouchableRedirectorWrapper path="/app/interests" content={
          <View style={styles.btnActionDone}>
            <Text style={styles.btnActionDoneText}>CONTINUAR</Text>
          </View>
        } />
      </View>
    );
  }

}

let heightCorrection = Platform.OS === 'ios' ? 118 : 130;
const styles = StyleSheet.create({

  container: {
  },

  control: {
    height: Dimensions.get('window').height - 118,
    marginHorizontal: 10,
  },

  inputLabel: {
    marginTop: 10,
    marginBottom: 4,
    marginLeft: 12,
    color: '#757575',
  },
  input: {
    height: 36,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#616161',
  },

  addSkillTouchable: {
    position: 'absolute',
    right: 0,
    width: 44,
  },

  addSkillIcon: {
    position: 'absolute',
    right: 0,
    fontSize: 20,
    backgroundColor: '#FAFAFA',
    color: '#BF360C',
    width: 40,
    paddingTop: 8,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },

  list: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ECEFF1',
  },

  listItem: {
    paddingVertical: 14,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF1',
    backgroundColor: '#FAFAFA',
  },

  itemRemoveIconWrapper: {
    position: 'absolute',
    right: 20,
    marginTop: 10,
  },

  itemRemoveIcon: {
    marginTop: 3,
    fontSize: 20,
    color: '#b71c1c'
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
