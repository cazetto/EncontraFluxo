import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Redirect } from 'react-router-native';

import moment from 'moment';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';
import ModalConfirm from '../../../components/modal-confirm/ModalConfirm';

import ConnectedPeopleModal from './ConnectedPeopleModal';

import UserService from '../../../services/UserService';
import EventService from '../../../services/EventService';
import NeighborhoodService from '../../../services/NeighborhoodService';

export default class FluxPreview extends Component {

  state = {
    id: null,

    fetchingEvent: true,
    fetchingNeighborhood: true,

    deleteModalIsVisible: false,
    peopleModalIsVisible: false,
  }

  componentWillMount() {
    let id = this.props.match.params.id;
    this.fetchEvent(id);
  }

  fetchEvent(id) {
    const userId = UserService.id;

    EventService.get(id)
    .then(response => {
      let {
        id,
        responsavel: { nome:eventUserName, id:eventUserId },
        bairro_id: neighborhoodId,
        nome:name,
        colaboradores:people,
        descricao:description,
        dt_evento:date,
        endereco:address,
        habilidades:skills,
        interesses:interests,
        materiais:materials,
        colaboradores:contributors,
      } = response;

      this.setState({fetchingEvent:false, id, eventUserId, userId, eventUserName, neighborhoodId, name, people, description, date, address, skills, interests, interests, materials, contributors});

      this.fetchNeighborhood(neighborhoodId);
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

  renderSkills() {
    return !!this.state.skills.length && (
      <View style={styles.group}>
        <Text style={styles.infoLabel}>Habilidades: <Text style={styles.info}>
            { this.state.skills.reduce((accumulator, {nome}, index, array) =>
              `${accumulator}${nome}${(index < array.length-1 ? ', ' : '.')}`, '') }
          </Text>
        </Text>
      </View>
    );
  }

  renderMaterials() {
    return !!this.state.materials.length && (
      <View style={styles.group}>
        <Text style={styles.infoLabel}>Materiais: <Text style={styles.info}>
            { this.state.materials
            .reduce((accumulator, nome, index, array) =>
            `${accumulator}${nome}${(index < array.length-1 ? ', ' : '.')}`, '') }
          </Text>
        </Text>
      </View>
    );
  }

  delete() {
    this.setState({ deleteModalIsVisible: false });
    EventService.delete(this.state.id)
    .then(response => {
      console.log('EventService.delete:response', response);
      this.setState({redirectURI: '/app/dashboard'})
    })
    .catch(error => {
      console.log('Error when delete event', error);
      this.setState({redirectURI: '/app/dashboard'})
    })
  }

  render() {

    let {
      fetchingEvent, fetchingNeighborhood,
      id, eventUserId, eventUserName, userId, name, people, description, date, address, skills, interests, materials, user, neighborhood, contributors
    } = this.state;

    let isOwner = eventUserId === userId;

    console.log('eventUserId', eventUserId);
    console.log('userId');

    return (
      fetchingEvent || fetchingNeighborhood ?
      <ActivityIndicator style={styles.activityIndicator} /> :
      this.state.redirectURI ?
      <Redirect push to={this.state.redirectURI} /> :
      <View style={styles.container}>
        <View style={styles.content}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.group}>
              <Text style={styles.infoLabel}>Nome: <Text style={styles.info}>{name}</Text></Text>
              <Text style={styles.infoLabel}>Criador: <Text style={styles.info}>{eventUserName}</Text></Text>
              <Text style={styles.infoLabel}>Bairro: <Text style={styles.info}>{neighborhood}</Text></Text>
              <Text style={styles.infoLabel}>Local: <Text style={styles.info}>{address}</Text></Text>
              <Text style={styles.infoLabel}>Data: <Text style={styles.info}>{moment(date).format('DD/MM/YYYY')}</Text></Text>
            </View>
            <View style={styles.group}>
              <Text style={styles.info}>{people && people.length || 0} PESSOAS NO FLUXO</Text>
            </View>
            <View style={styles.group}>
              <Text style={styles.infoLabel}>Descrição: <Text style={styles.info}>{description}</Text></Text>
            </View>

            {this.renderSkills()}
            {this.renderMaterials()}

          </ScrollView>

          <ModalConfirm
            isVisible={this.state.deleteModalIsVisible}
            text="Tem certeza que deseja excluir este fluxo?"
            confirmText="Excluir"
            cancelText="Cancelar"
            confirm={() => {this.delete()}}
            cancel={() => {this.setState({deleteModalIsVisible:false})}}
          />

          <ConnectedPeopleModal
            contributors={this.state.contributors}
            isVisible={this.state.peopleModalIsVisible}
            close={() => {this.setState({peopleModalIsVisible:false})}}
          />
          <TouchableOpacity onPress={() => { this.setState({peopleModalIsVisible: true}) }} style={styles.btnConnectedPeople}>
            <Text style={styles.btnConnectedPeopleText}>VER PESSOAS CONECTADAS</Text>
          </TouchableOpacity>
        </View>

        {
          isOwner ?
          <View style={styles.doubleBtns}>
            <View style={styles.btnHalfLeft}>
              <TouchableRedirectorWrapper path={`/app/flux-create-step-1`} state={{editable: this.state}} content={
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
    flex: 1,
    backgroundColor: '#ECEFF1',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    marginBottom: 10,
  },
  info: {
    color: '#37474F',
    fontWeight: '600',
  },
  infoLabel: {
    color: '#37474F',
    fontWeight: '400',
    marginBottom: 3
  },
  group: {
    marginBottom: 10,
  },
  activityIndicator: {
    marginTop: '50%',
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
  },
  btnConnectedPeople: {
    backgroundColor: '#43A047',
    padding: 8,
    borderRadius: 4,
  },
  btnConnectedPeopleText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
    padding: 4,
  }
});
