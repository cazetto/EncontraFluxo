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

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

import neighborhoods from '../../../static/neighborhoods';

export default class Skills extends Component {

  constructor(props) {
    super(props);

    this.state = {
      skill: '',
      skills: [],
      neighborhood: null,
    };

    this.neighborhoods = neighborhoods;
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

  onSelectNeighborhoodHandle(index) {
    this.setState({
      neighborhood: this.neighborhoods[index]
    });
  }

  render() {
    
    return (
      <View style={styles.container}>

        <View style={styles.control}>

          <Text style={styles.inputLabel}>Local onde você mora:</Text>
          <ModalDropdown style={styles.selectNeighborhood} options={this.neighborhoods}
            onSelect={index => { this.onSelectNeighborhoodHandle(index); }}
            dropdownStyle={styles.selectNeighborhoodModal}
            >
            <View>
              <TextInput
                editable={false}
                placeholder="SELECIONE O BAIRRO"
                value={this.state.neighborhood}
                style={styles.input}
                ></TextInput>
              <Icon name={this.state.neighborhood ? 'check' : 'chevron-small-down'} style={[styles.selectNeighborhoodIcon, this.state.neighborhood && styles.selectNeighborhoodIconChecked]}/>
            </View>
          </ModalDropdown>

          <Text style={styles.inputLabel}>Suas habilidades:</Text>
          <View style={styles.selectNeighborhood}>
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
  selectNeighborhood: {

  },
  selectNeighborhoodIcon: {
    position: 'absolute',
    right: 0,
    fontSize: 35,
    width: 44,
    textAlign: 'center',
    color: '#BF360C',
    backgroundColor: 'transparent',
  },
  selectNeighborhoodIconChecked: {
    color: '#BF360C',
    fontSize: 20,
    color: '#8BC34A',
    marginTop: 7,
  },
  selectNeighborhoodModal: {
    width: Dimensions.get('window').width - inputMargin * 2,
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
