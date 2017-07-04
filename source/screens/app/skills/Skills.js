import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Entypo';

import Select from '../../../components/select/Select';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

import NeighborhoodService from '../../../services/NeighborhoodService';
import UserService from '../../../services/UserService';
import SkillsService from '../../../services/SkillsService';

export default class Skills extends Component {
  state = {
    skill: '',
    skills: [],
    neighborhoods: null,
    selectedNeighborhoodId: null,
  }

  componentWillMount() {
    NeighborhoodService.find()
    .then(response => {
      let neighborhoods = response.objects;
      let neighborhoodsNames = neighborhoods.map(neighborhood => neighborhood.nome);
      this.setState({neighborhoods, neighborhoodsNames});
    });

    var immediateID = setImmediate(() => {
      clearImmediate(immediateID);

      // Authenticated services calls goes here

      UserService.get()
      .then(response => {
        
        console.log('UserService', response);


      });

    });
  }

  onNeighborhoodSelectHandle(index) {
    this.setState({
      selectedNeighborhoodId: this.state.neighborhoods[index]
    });
  }

  addSkillHandle() {
    if(this.state.skill === '') return;

    let skills = this.state.skills.slice();

    skills.push({title: this.state.skill});

    this.setState(Object.assign({}, this.state, {
      skills,
      skill: '',
    }));
  }

  removeSkillHandle() {
    console.log('Remove Skill');
  }

  renderSkills() {
    return this.state.skills.map((skill, index) => {
      return (
        <View style={styles.listItem} key={index}>
          <Text>{skill.title}</Text>
          <TouchableOpacity onPress={() => { this.removeSkillHandle(); }} style={styles.itemRemoveIconWrapper}>
            <Icon name="minus" style={styles.itemRemoveIcon}/>
          </TouchableOpacity>
        </View>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.control}>

          <Text style={styles.inputLabel}>Local onde você mora:</Text>
          <Select placeholder="SELECIONE O BAIRRO" options={this.state.neighborhoodsNames} onSelect={this.onNeighborhoodSelectHandle.bind(this)}></Select>

          <Text style={styles.inputLabel}>Suas habilidades:</Text>
          <View>
            <View>
              <TextInput
                placeholder="ADICIONE UMA HABILIDADE"
                onChangeText={ skill => {
                  this.setState(Object.assign({}, this.state, {
                    skill
                  }));
                }}
                value={this.state.skill}
                style={styles.input}
                ></TextInput>

              <TouchableOpacity style={styles.addSkillTouchable} onPress={() => { this.addSkillHandle(); }}>
                <Icon name="plus" style={styles.addSkillIcon}/>
              </TouchableOpacity>
            </View>
          </View>

        </View>

        <ScrollView style={styles.list}>
          {this.renderSkills()}
        </ScrollView>

        <TouchableRedirectorWrapper path="/interests" content={
          <View style={styles.btnActionDone}>
            <Text style={styles.btnActionDoneText}>CONTINUAR</Text>
          </View>
        } />


      </View>
    );
  }

}
const inputMargin = 10;
const styles = StyleSheet.create({

  container: {
    height: Dimensions.get('window').height - 70,
  },

  control: {
    marginLeft: inputMargin,
    marginRight: inputMargin,
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
    backgroundColor: '#FBC02D',
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
