import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';

import moment from 'moment';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';
import ModalConfirm from '../../../components/modal-confirm/ModalConfirm';

import EventService from '../../../services/EventService';
import UserService from '../../../services/UserService';
import NeighborhoodService from '../../../services/NeighborhoodService';

export default class FluxPreview extends Component {

  state = {
    id: null,

    fetchingEvent: true,
    fetchingUser: true,
    fetchingNeighborhood: true,

    deleteModalIsVisible: false,
  }

  componentWillMount() {
    let id = this.props.match.params.id;
    this.fetchEvent(id);
  }

  fetchEvent(id) {
    EventService.get(id)
    .then(response => {
      let {
        id,
        usuario_id: eventUserId,
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

      this.setState({fetchingEvent:false, id, eventUserId, neighborhoodId, name, people, description, date, address, skills, interests, interests, materials});

      this.fetchUser(eventUserId);
      this.fetchNeighborhood(neighborhoodId);

    })
    .catch(error => {
      console.log('Error when fetch event', error);
    });
  }

  fetchUser(id) {
    UserService.get(id)
    .then(response => {
      console.log('UserService.get:response:', response);
      let { id:userId, nome:user } = response;
      this.setState({fetchingUser:false, user, userId});
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

  delete() {
    this.setState({ deleteModalIsVisible: false });
    EventService.delete(this.state.id)
    .then(response => {
      console.log('EventService.delete:response', response);
    })
    .catch(error => {
      console.log('EventService.catch:error', error);
    })
  }

  render() {

    let {
      fetchingEvent, fetchingUser, fetchingNeighborhood,
      id, eventUserId, userId, name, people, description, date, address, skills, interests, materials, user, neighborhood
    } = this.state;

    let isOwner = eventUserId === userId;

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

          <ModalConfirm
            isVisible={this.state.deleteModalIsVisible}
            text="Tem certeza que deseja excluir este fluxo?"
            confirmText="Excluir"
            cancelText="Cancelar"
            confirm={() => {this.delete()}}
            cancel={() => {this.setState({deleteModalIsVisible:false})}}
          />
        </View>
        {
          isOwner
          ?
          <View style={styles.doubleBtns}>
            <View style={styles.btnHalfLeft}>
              <TouchableRedirectorWrapper path={`/app/flux-create-step-1/${id}/edit`} state={{editable: this.state}} content={
                <View style={styles.btnActionDone}>
                  <Text style={styles.btnHalfText}>EDITAR</Text>
                </View>
              } />
            </View>
            <TouchableOpacity onPress={() => { this.setState({deleteModalIsVisible: true}) }} style={styles.btnHalfRight}>
              <View style={styles.btnActionDone}>
                <Text style={styles.btnHalfText}>EXCLUIR</Text>
              </View>
            </TouchableOpacity>
          </View>
          :
          <TouchableRedirectorWrapper path={`/app/flux-join/${id}`} state={this.state} content={
            <View style={styles.btnActionDone}>
              <Text style={styles.btnActionDoneText}>ENTRAR NESSE FLUXO</Text>
            </View>
          } />
        }
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
  },

  doubleBtns: {
    flexDirection: 'row',
  },
  btnHalfText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
    padding: 1,
  },
  btnHalfLeft: {
    flex: 1,
    backgroundColor: '#455A64',
    marginRight: 1,
    marginLeft: 2,
    marginBottom: 3,
    borderBottomLeftRadius: 4,
  },
  btnHalfRight: {
    flex: 1,
    backgroundColor: '#455A64',
    marginLeft: 1,
    marginRight: 2,
    marginBottom: 3,
    borderBottomRightRadius: 4,
  }
});
