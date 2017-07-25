import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Dimensions, Platform } from 'react-native';

import { CheckBox } from 'react-native-elements';

import moment from 'moment';

import update from 'immutability-helper';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

// import JoinService from '../../../services/JoinService';
import EventService from '../../../services/EventService';

export default class FluxPreview extends Component {

  state = {
    eventData: {},
  }

  componentWillMount() {
    let eventData = {...this.props.location.state};
    eventData.materials = eventData.materials.map(material => ({name: material, selected: false}));
    this.setState({eventData});
  }

  onSelectSkillHandle(index) {
    let skills = [...this.state.eventData.skills];
    skills[index].selected = !skills[index].selected;
    let eventData = update(this.state.eventData, {$merge: {skills}});
    this.setState({eventData});
  }

  onSelectMaterialHandle(index) {
    let materials = [...this.state.eventData.materials];
    materials[index].selected = !materials[index].selected;
    let eventData = update(this.state.eventData, {$merge: {materials}});
    this.setState({eventData});
  }

  renderSkills() {
    return this.state.eventData.skills.map((skill, index) => {
      return <CheckBox
          key={index}
          checkedColor='#546E7A'
          iconRight
          textStyle={styles.checkBoxText}
          key={skill.id}
          title={skill.nome}
          checked={skill.selected}
          onPress={() => this.onSelectSkillHandle(index)}
          style={styles.checkBox}
          // containerStyle={styles.checkBoxContainer}
        />;
    });
  }

  renderMaterials() {
    return this.state.eventData.materials.map((material, index) => {
      return <CheckBox
          key={index}
          checkedColor='#546E7A'
          iconRight
          textStyle={styles.checkBoxText}
          title={material.name}
          checked={material.selected}
          onPress={() => this.onSelectMaterialHandle(index)}
          style={styles.checkBox}
          // containerStyle={styles.checkBoxContainer}
        />;
    });
  }

  join() {
    let evento_id = this.state.eventData.id;
    let habilidades = this.state.eventData.skills
    .filter(element => (element.selected))
    .map(element => ({id: element.id}));
    let materiais = this.state.eventData.materials
    .filter(element => (element.selected))
    .map(element => (element.name));

    let data = { evento_id, habilidades, materiais };

    console.log('DADOS ENVIADOS PARA COLABORAR', JSON.stringify(data) );

    EventService.join(data)
    .then(response => {
      console.log('colaborarcolaborarcolaborarcolaborarcolaborar', response);
    })
    .catch(error => {
      console.log('Join error:', error);
    })

  }

  render() {
    let { id, name, people, description, date, address, skills, interests, materials, user, neighborhood } = this.state.eventData;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <ScrollView>
          { !this.state.eventData.skills.length ? null :
            <View style={styles.group}>
              <Text style={styles.info}>POSSO CONTRIBUIR COMO?</Text>
              {this.renderSkills()}
            </View>
          }
          { !this.state.eventData.materials.length ? null :
            <View style={styles.group}>
              <Text style={styles.info}>CONSIGO ARRANJAR/DOAR:</Text>
              {this.renderMaterials()}
            </View>
          }
          </ScrollView>
          <Text>Ao entrar neste fluxo eu permito que <Text style={styles.userName}>{user}</Text> entre em contato comigo por email.</Text>
        </View>


        <TouchableOpacity onPress={() => this.join()} style={styles.btnActionDone}>
          <Text style={styles.btnActionDoneText}>CONFIRMAR</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  info: {
    color: '#424242',
  },
  group: {
    marginBottom: 20,
  },
  activityIndicator: {
    marginTop: '50%',
  },
  checkBoxContainer: {

  },
  userName: {
    fontWeight: 'bold',
  },
  checkBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  checkBoxText: {
    flex:1,
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
