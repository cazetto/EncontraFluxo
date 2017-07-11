import React, {Component} from 'react';
import { Redirect } from 'react-router';
import {StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, Platform} from 'react-native';

import ItemDistributionList from '../../../components/item-distribution-list/ItemDistributionList';

import update from 'immutability-helper';
import _ from 'lodash';

import styles from './styles';

// Services imports
import InterestService from '../../../services/InterestService';
import EventService from '../../../services/EventService';

export default class FluxCreateStep4 extends Component {
  state = {
    availableInterests: [],
    addedInterests: [],
    eventData: {
      interesses: [],
    },
    isComplete: false,
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.fetchInterests();
  }

  fetchInterests() {
    InterestService.find()
    .then(({objects:availableInterests}) => {
      this.setState({availableInterests});
    })
    .catch(error => {});
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

  onChangeInterestsHandle(addedInterests, availableInterests) {
    let interesses = addedInterests.map(current => ({id: current.id}));
    let eventData = update(this.state.eventData, {$merge: {interesses}});
    this.setState({addedInterests, availableInterests, eventData});
  }

  next() {
    EventService.data = update(EventService.data, {$merge: this.state.eventData});
    console.log(EventService.data);
    this.setState({isComplete: true});
  }

  render() {
    let incompleteFill = this.state.eventData.interesses.length === 0;

    return (
      this.state.isComplete ?
      <Redirect to="/flux-create-step-5" /> :
      <View style={styles.container}>

        <View style={styles.page}>
          <Text style={styles.inputLabel}>Você pretende reunir pessoas com quais interesses?</Text>
          <ItemDistributionList
            placeholder="ADICIONE UM INTERESSE"
            available={this.state.availableInterests}
            added={this.state.addedInterests}
            onAddedItemsChanged={(available, added) => this.onChangeInterestsHandle(available, added)}
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
