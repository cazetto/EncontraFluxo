import React, {Component} from 'react';
import { Redirect } from 'react-router';
import {StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, Platform} from 'react-native';

import ItemDistributionList from '../../../components/item-distribution-list/ItemDistributionList';

import update from 'immutability-helper';
import _ from 'lodash';

import styles from './styles';

// Services imports
import SkillService from '../../../services/SkillService';
import EventService from '../../../services/EventService';

export default class FluxCreateStep2 extends Component {
  state = {
    availableSkills: [],
    addedSkills: [],
    eventData: {
      habilidades: [],
    },
    isComplete: false,
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.fetchSkills();
  }

  fetchSkills() {
    SkillService.find()
    .then(({objects:availableSkills}) => this.setState({availableSkills}))
    .catch(error => console.log('Error when fetching skills.'));
  }

  // Input changes
  delayedChangeTextInput(field) {
    return (
      _.debounce(value => {
        let eventData = update(this.state.eventData, {$merge: {[field]:value}});
        this.setState({eventData});
      }, 100)
    );
  }

  onChangeSkillsHandle(addedSkills, availableSkills) {
    let habilidades = addedSkills.map(current => current.id);
    let eventData = update(this.state.eventData, {$merge: {habilidades}});
    this.setState({addedSkills, availableSkills, eventData});
  }

  next() {
    EventService.data = update(EventService.data, {$merge: this.state.eventData});
    this.setState({isComplete: true});
  }

  render() {
    let incompleteFill = this.state.eventData.habilidades.length === 0;

    return (
      this.state.isComplete ?
      <Redirect to="/flux-create-step-3" /> :
      <View style={styles.container}>

        <View style={styles.page}>
          <Text style={styles.inputLabel}>Para tornar este fluxo possível, pessoas com as quais habilidades devem fazer parte?</Text>
          <ItemDistributionList
            available={this.state.availableSkills}
            added={this.state.addedSkills}
            onAddedItemsChanged={(available, added) => this.onChangeSkillsHandle(available, added)}
          />
        </View>

        <TouchableOpacity onPress={() => {this.next()}} disabled={incompleteFill}>
          <View style={[styles.btnActionDone, incompleteFill && styles.btnActionDoneDisabled]}>
            <Text style={styles.btnActionDoneText}>CONTINUAR</Text>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}
