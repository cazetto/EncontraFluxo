import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class PeopleItem extends Component {

  state = {}

  componentWillMount() {
    let { nome:name, email, habilidades:skills, materiais:materials } = this.props.data;
    this.setState({ name, email, skills, materials });
  }

  renderSkills() {
    return (
      this.state.skills.length > 0 &&
      <View style={styles.list}>
        <Text style={styles.itemLabel}>Habilidades que pode compartilhar:</Text>
        <Text style={styles.itemText}>
          {this.state.skills
          .reduce((accumulator, {nome}, index, array) =>
          `${accumulator}${nome}${(index < array.length-1 ? ', ' : '.')}`, '')}
        </Text>
      </View>
    );
  }

  renderMaterials() {
    return (
      this.state.materials.length > 0 &&
      <View style={styles.list}>
        <Text style={styles.itemLabel}>Materiais que pode arranjar:</Text>
        <Text style={styles.itemText}>
          {this.state.materials
          .reduce((accumulator, nome, index, array) =>
          `${accumulator}${nome}${(index < array.length-1 ? ', ' : '.')}`, '')}
        </Text>
      </View>
    );
  }

  render() {
    let { name, email, skills, materials } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        {this.renderSkills()}
        {this.renderMaterials()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#B0BEC5',
  },
  list: {
    marginTop: 10,
  },
  name: {
    fontWeight: '700',
    color: '#37474F',
  },
  email: {
    fontWeight: '400',
    color: '#263238',
  },
  itemLabel: {
    fontWeight: '500',
    color: '#263238'
  },
  itemText: {
    fontWeight: '600',
    color: '#039BE5',
  },
});
