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

import InterestService from '../../../services/InterestService';
import EventService from '../../../services/EventService';

import styles from './styles';

export default class FluxCreateStep4 extends Component {

  state = {
    interests: [],
    fetchingInterests: true,
  };

  componentWillMount() {
    let editState = this.props.location.state;
    if(editState)
    if(editState.editable) this.editable = editState.editable;
    this.fetchInterests();
  }

  fetchInterests() {
    InterestService.find({ limit: 0 })
    .then(({objects}) => {
      let interests = this.editable ? objects.map(interest => {
        interest.selected = this.editable.interests.some(addedSkill => interest.id === addedSkill.id);
        return interest;
      }) : objects;
      this.setState({interests, fetchingInterests: false});
    })
    .catch(error => {});
  }

  selectItem(index, value) {
    let interests = this.state.interests.slice();
    let current = interests[index].selected = value;
    this.setState({interests});
  }

  renderInterests() {
    return this.state.interests.map((interest, index) => {
      return (
        <View style={styles.listItem} key={index}>
          <Text style={styles.listItemTitle}>{interest.nome}</Text>
          <Switch
            onValueChange={value => this.selectItem(index, value)}
            value={ interest.selected } />
        </View>
      );
    });
  }

  next() {
    let interesses = this.state.interests
    .filter(interest => interest.selected)
    .map(({id}) => ({id}));
    EventService.data = update(EventService.data, {$merge: {interesses}});
    this.setState({redirect: true});
  }

  render() {
    let incompleteFill = !this.state.interests.some(interest => interest.selected);
    return (
      this.state.redirect ?
      <Redirect push to={{
        pathname:"/app/flux-create-step-5",
        state: {editable: this.editable}
      }} /> :
      this.state.fetchingInterests ?
      <ActivityIndicator style={styles.activityIndicator} /> :
      <View style={styles.container}>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderLabel}>Você pretende reunir pessoas com quais interesses?</Text>
        </View>
        <ScrollView>
          {this.renderInterests()}
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
