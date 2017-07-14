import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';

import moment from 'moment';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

import EventService from '../../../services/EventService';
import UserService from '../../../services/UserService';
import NeighborhoodService from '../../../services/NeighborhoodService';

export default class FluxPreview extends Component {

  state = {
    id: null,

    fetchingEvent: true,
    fetchingUser: true,
    fetchingNeighborhood: true,
  }

  componentWillMount() {
    let id = this.props.match.params.id;
    this.fetchEvent(id);
  }

  fetchEvent(id) {
    EventService.get(id)
    .then(response => {
      console.log(response);
      let {
        id,
        usuario_id: userId,
        bairro_id: neighborhoodId,
        nome:name,
        colaboradores:people,
        descricao:description,
        dt_evento:date,
        endereco:address,
        habilidades:skills,
        interesses:interests,
        materiais:materials,
      } = response;

      this.setState({fetchingEvent:false, id, name, people, description, date, address, skills, interests, interests, materials});

      this.fetchUser(userId);
      this.fetchNeighborhood(neighborhoodId);

    })
    .catch(error => {
      console.log('Error when fetch event', error);
    });
  }

  fetchUser(id) {
    UserService.get(id)
    .then(response => {
      let { nome:user } = response;
      this.setState({fetchingUser:false, user});
    })
    .catch(error => {
      console.log('Error when fetch event', error);
    });
  }

  fetchNeighborhood(id) {
    NeighborhoodService.get(id)
    .then(response => {
      let { nome:neighborhood } = response;
      this.setState({fetchingNeighborhood:false, neighborhood});
    })
    .catch(error => {
      console.log('Error when fetch event', error);
    });
  }

  renderList(list) {
    return list
    .reduce((accumulator, {nome}, index, array) =>
    `${accumulator}${nome}${(index < array.length-1 ? ', ' : '.')}`, '');
  }

  render() {

    let {
      fetchingEvent, fetchingUser, fetchingNeighborhood,
      id, name, people, description, date, address, skills, interests, materials, user, neighborhood
    } = this.state;

    return (
      fetchingEvent || fetchingUser || fetchingNeighborhood ?
      <ActivityIndicator style={styles.activityIndicator} /> :
      <View style={styles.container}>

        <View style={styles.content}>
          <ScrollView>
            <View style={styles.group}>
              <Text style={[styles.info]}>Nome: {name}</Text>
              <Text style={[styles.info]}>Criador: {user}</Text>
              <Text style={[styles.info]}>Bairro: {neighborhood}</Text>
              <Text style={[styles.info]}>Local: {address}</Text>
              <Text style={[styles.info]}>Data: {moment(date).format('DD/MM/YYYY')}</Text>
            </View>
            <View style={styles.group}>
              <Text style={[styles.info]}>{people && people.length || 0} PESSOAS NO FLUXO</Text>
            </View>
            <View style={styles.group}>
              <Text style={[styles.info]}>Descrição: {description}</Text>
            </View>
            <View style={styles.group}>
              <Text style={[styles.info]}>Habilidades: {this.renderList(this.state.skills)}</Text>
            </View>
            <View style={styles.group}>
              <Text style={[styles.info]}>Materiais: {this.renderList(this.state.materials)}</Text>
            </View>
          </ScrollView>
        </View>
        <TouchableRedirectorWrapper path={`/flux-join/${id}`} state={this.state} content={
          <View style={styles.btnActionDone}>
            <Text style={styles.btnActionDoneText}>ENTRAR NESSE FLUXO</Text>
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
    marginBottom: 10,
  },
  activityIndicator: {
    marginTop: 20,
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
