import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Icon,
  Switch,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';

import { Redirect } from 'react-router';

import update from 'immutability-helper';

import SkillService from '../../../services/SkillService';
import EventService from '../../../services/EventService';

import styles from './styles';

export default class FluxCreateStep2 extends Component {

  state = {
    skills: [],
    fetchingSkills: true,
  };

  componentWillMount() {
    let editState = this.props.location.state;
    if(editState)
    if(editState.editable) this.editable = editState.editable;
    this.fetchSkills();
  }

  fetchSkills() {
    SkillService.find({ limit: 0 })
    .then(({objects}) => {
      let skills = this.editable ? objects.map(skill => {
        skill.selected = this.editable.skills.some(addedSkill => skill.id === addedSkill.id);
        return skill;
      }) : objects;
      let skillsOrdered = skills.sort((a, b) => a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0);
      this.setState({skills:skillsOrdered, fetchingSkills: false});
    })
    .catch(error => {});
  }

  selectItem(index, value) {
    let skills = this.state.skills.slice();
    let current = skills[index].selected = value;
    this.setState({skills});
  }

  renderSkills() {
    return this.state.skills.map((skill, index) => {
      return (
        <View style={styles.listItem} key={index}>
          <Text style={styles.listItemTitle}>{skill.nome}</Text>
          <Switch
            onValueChange={value => this.selectItem(index, value)}
            value={ skill.selected } />
        </View>
      );
    });
  }

  next() {
    let habilidades = this.state.skills
    .filter(skill => skill.selected)
    .map(({id}) => ({id}));
    EventService.data = update(EventService.data, {$merge: {habilidades}});
    this.setState({redirect: true});
  }

  render() {
    let incompleteFill = !this.state.skills.some(skill => skill.selected);
    return (
      this.state.redirect ?
      <Redirect push to={{
        pathname:"/app/flux-create-step-3",
        state: {editable: this.editable}
      }} /> :
      this.state.fetchingSkills ?
      <ActivityIndicator style={styles.activityIndicator} /> :
      <View style={styles.container}>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderLabel}>Para tornar este fluxo possível, pessoas com as quais habilidades devem fazer parte?</Text>
        </View>
        <ScrollView>
          {this.renderSkills()}
        </ScrollView>

        <TouchableOpacity onPress={() => {this.next()}} disabled={incompleteFill}>
          <View style={[styles.btnActionDone, incompleteFill && styles.btnActionDoneDisabled]}>
            <Text style={styles.btnActionDoneText}>CONTINUAR</Text>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}
