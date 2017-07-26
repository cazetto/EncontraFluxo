import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import TouchableRedirectorWrapper from '../touchable-redirector-wrapper/TouchableRedirectorWrapper';

import UserService from '../../services/UserService';
import NeighborhoodService from '../../services/NeighborhoodService';

import moment from 'moment';

export default class FluxListItem extends PureComponent {

  componentWillMount() {
    let { id, nome:name, descricao:description, bairro_id:neighborhoodId, colaboradores:people, dt_evento:date,
    estou_participando, responsavel, materiais:materiaisNecessarios, habilidades:habilidadesNecessarias, colaboradores } = this.props.data;
    // wat?
    // SETA AMARELA - Fluxos que ainda não expiraram
    // BOLA VERDE - Quando eu pertenço ou sou dono daquele fluxo
    // SETA AZUL - Fluxos que ainda não expiraram e que conquistou o número de habilidades e materiais que ele precisa para acontecer
    // '#FBC02D' '#7CB342' '#1E88E5'
    // let eventIsNotExpiredAndCompleted = eventIsNotExpired && true;
    let userIsOwnerOrContributor = UserService.id === responsavel.id || estou_participando;
    let eventIsNotExpired = moment(date).diff(moment(), 'days') <= 0;
    var color = '#1E88E5';
    if (userIsOwnerOrContributor) color = '#7CB342';
    if (eventIsNotExpired) color = '#FBC02D';

    this.setState({
      id,
      color,
      name,
      description,
      people,
      date: moment(date).format('DD/MM/YYYY'),
    });

    this.fetchNeighborhood(neighborhoodId);
  }

  fetchNeighborhood(id) {
    if(!id) return;

    NeighborhoodService.get(id)
    .then(response => this.setState({neighborhood: response.nome}))
    .catch(error => console.log('Error on fetch neighborhood:', error));
  }

  render() {
    let { id, color, name, description, neighborhood, people, date } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <View style={styles.header}>
            <View style={[styles.bullet, {backgroundColor: color}]}></View>
            <Text style={styles.title}>{name}</Text>
          </View>
          <Text style={styles.neighborhood}>Bairro: {neighborhood}</Text>
          <View>
            <Text style={styles.description}>
              {description}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.peopleCount}>{people.length} pessoas contectadas </Text>
            <Text style={styles.createdAt}>Data: {date}</Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <TouchableRedirectorWrapper path={`/app/flux-preview/${id}`} content={
            <Icon name='md-arrow-dropright' style={[styles.arrowIcon, {color}]}/>
          } />
        </View>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#EEEEEE'
  },
  leftColumn: {
    paddingRight: 10,
  },
  rightColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    width: 12,
    height: 12,
    borderRadius: 12,
    marginRight: 6,
    backgroundColor: '#8BC34A',
  },
  title: {
    color: '#616161',
    fontWeight: 'bold',
  },
  neighborhood: {
    marginTop: 8,
    color: '#424242',
  },
  description: {
    marginTop: 8,
    color: '#424242',
    maxWidth: Dimensions.get('window').width - 70,
  },
  info: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  peopleCount: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#424242',
  },
  createdAt: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#424242',
  },
  arrowIcon: {
    paddingVertical: 20,
    paddingHorizontal: 14,
    fontSize: 50,
  }
});
