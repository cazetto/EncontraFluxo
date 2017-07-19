import React, {Component} from 'react';
import { Redirect } from 'react-router';
import {StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, Platform} from 'react-native';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';
import ItemDistributionList from '../../../components/item-distribution-list/ItemDistributionList';

import update from 'immutability-helper';
import _ from 'lodash';

import styles from './styles';

// Services imports
import MaterialService from '../../../services/MaterialService';
import EventService from '../../../services/EventService';

export default class FluxCreateStep3 extends Component {
  state = {
    availableMaterials: [],
    addedMaterials: [],
    eventData: {
      materiais: [],
    },
    isComplete: false,
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {

    let editState = this.props.location.state;
    if(editState.editable) {
      let { editable } = editState;
      this.editable = editable;
      let editableMaterials = editable.materials.map(material => material.id);
      let eventData = {
        materiais: editableMaterials
      }
      this.setState({eventData});
    }


    this.fetchMaterials();
  }

  fetchMaterials() {
    MaterialService.find()
    .then(({objects:availableMaterials}) => {

      if(this.editable) {
        this.setState({availableMaterials, addedMaterials: this.editable.materials});
      }
      else {
        this.setState({availableMaterials})
      }

    })
    .catch(error => console.log('Error when fetching materials.'));
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

  onChangeMaterialsHandle(addedMaterials, availableMaterials) {
    let materiais = addedMaterials.map(current => ({id: current.id}));
    let eventData = update(this.state.eventData, {$merge: {materiais}});
    this.setState({addedMaterials, availableMaterials, eventData});
  }

  next() {
    EventService.data = update(EventService.data, {$merge: this.state.eventData});
    console.log(EventService.data);
    this.setState({isComplete: true});
  }

  render() {
    return (
      this.state.isComplete ?
      <Redirect to={{
        pathname:"/app/flux-create-step-4",
        state: {editable: this.editable}
      }} /> :
      <View style={styles.container}>

        <View style={styles.page}>
          <Text style={styles.inputLabel}>É necessário algum material para que este fluxo aconteça? (opcional)</Text>
          <ItemDistributionList
            placeholder="ADICIONE UM MATERIAL"
            available={this.state.availableMaterials}
            added={this.state.addedMaterials}
            onAddedItemsChanged={(available, added) => this.onChangeMaterialsHandle(available, added)}
          />
        </View>

        <TouchableOpacity onPress={() => {this.next()}}>
          <View style={styles.btnActionDone}>
            <Text style={styles.btnActionDoneText}>CONTINUAR</Text>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}
