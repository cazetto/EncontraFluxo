import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';

import { CheckBox } from 'react-native-elements';

import moment from 'moment';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

import JoinService from '../../../services/JoinService';

export default class FluxPreview extends Component {

  state = {
  }

  componentWillMount() {
    this.setState(this.props.location.state);
  }

  onSelectSkillHandle(index) {
    let skills = this.state.skills.slice();
    skills[index].selected = !skills[index].selected;
    this.setState({skills});
  }

  onSelectMaterialHandle(index) {
    let materials = this.state.materials.slice();
    materials[index].selected = !materials[index].selected;
    this.setState({materials});
  }

  renderSkills() {
    return this.state.skills.map((skill, index) => {
      return <CheckBox
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
    return this.state.materials.map((material, index) => {
      return <CheckBox
        checkedColor='#546E7A'
        iconRight
        textStyle={styles.checkBoxText}
        key={material.id}
        title={material.nome}
        checked={material.selected}
        onPress={() => this.onSelectMaterialHandle(index)}
        style={styles.checkBox}
        // containerStyle={styles.checkBoxContainer}
      />;
    });
  }

  render() {
    let { id, name, people, description, date, address, skills, interests, materials, user, neighborhood } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.group}>
            <Text style={styles.info}>POSSO CONTRIBUIR COMO?</Text>
            {this.renderSkills()}
          </View>
          <View style={styles.group}>
            <Text style={styles.info}>CONSIGO ARRANJAR/DOAR:</Text>
            {this.renderMaterials()}
          </View>
        </View>
        <TouchableRedirectorWrapper path={`/flux-join/${id}`} content={
          <View style={styles.btnActionDone}>
            <Text style={styles.btnActionDoneText}>CONFIRMAR</Text>
          </View>
        } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 70,
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
    marginTop: 20,
  },
  checkBoxContainer: {

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
    backgroundColor: '#A1887F',
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
