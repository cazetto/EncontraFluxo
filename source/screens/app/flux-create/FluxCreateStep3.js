import React, {Component} from 'react';
import { Redirect } from 'react-router';
import {StyleSheet, View, ScrollView, Text, TextInput, Dimensions, TouchableOpacity, Platform} from 'react-native';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';
import ItemDistributionList from '../../../components/item-distribution-list/ItemDistributionList';

import update from 'immutability-helper';
import _ from 'lodash';

import styles from './styles';

// Services imports
import MaterialService from '../../../services/MaterialService';
import EventService from '../../../services/EventService';

import Icon from 'react-native-vector-icons/Entypo';

export default class FluxCreateStep3 extends Component {
  state = {
    material: '',
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

      console.log('editable', editable);
      let editableMaterials = editable.materials;
      this.setState({eventData:{materiais: editableMaterials}, addedMaterials:editable.materials});
    }
  }

  // Input changes
  delayedChangeTextInput(field) {
    return (
      _.debounce(value => {
        let state = update(this.state, {$merge: {[field]:value}});
        this.setState(state);
      }, 100)
    );
  }

  next() {
    EventService.data = update(EventService.data, {$merge: this.state.eventData});
    console.log(EventService.data);
    this.setState({isComplete: true});
  }

  addMaterial() {
    const material = this.state.material;
    if(material === '') return;
    let materiais = [...this.state.eventData.materiais];
    materiais.push(material);
    this.setState({eventData:{materiais}, material: null});
  }

  onRemoveMaterialHandle(item) {
    let materiais = [...this.state.eventData.materiais].filter(material => material != item);
    this.setState({eventData:{materiais}});
  }

  renderMaterials() {
    return this.state.eventData.materiais.map((item, index) => {
      return (
        <View style={styles.materialListItem} key={index}>
          <Text>{item}</Text>
          <TouchableOpacity onPress={() => { this.onRemoveMaterialHandle(item); }} style={styles.materialItemRemoveIconWrapper}>
            <Icon name="minus" style={styles.materialItemRemoveIcon}/>
          </TouchableOpacity>
        </View>
      );
    });
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

          <TextInput
            placeholder="MATERIAL"
            style={styles.input}
            defaultValue={this.state.material}
            onChangeText={this.delayedChangeTextInput('material')}
            autoCorrect={false}
            keyboardType="default"
            autoCapitalize="none"
            underlineColorAndroid="transparent">
          </TextInput>

          <TouchableOpacity style={styles.addMaterialButton} onPress={() => {this.addMaterial()}}>
            <Icon name="plus" style={styles.addMaterialIcon}/>
          </TouchableOpacity>

          <ScrollView style={[styles.materialList]}>
            {this.renderMaterials()}
          </ScrollView>

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
