import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, Dimensions, Platform, TouchableOpacity } from 'react-native';

import update from 'immutability-helper';
import moment from 'moment';

import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Entypo';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import Tab from './Tab';

import NeighborhoodService from '../../../services/NeighborhoodService';
import EventService from '../../../services/EventService';
import UserService from '../../../services/UserService';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      neighborhood: null,
      neighborhoods: [],
      index: 0,
      routes: [
        { key: '1', title: 'Aberto' },
        { key: '2', title: 'No Fluxo' },
        { key: '3', title: 'Rolou' },
      ],
    };
  }

  componentWillMount() {
    this.fetchNeighborhoods();
    this.fetchEvents();

    this.filters = [
      this.filterOpened,
      this.filterInFlux,
      this.filterHappening,
    ];
  }

  fetchNeighborhoods() {
    NeighborhoodService.find()
    .then(({objects}) => {
      let neighborhoods = objects.sort((a, b) => a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0);
      this.setState({neighborhoods});
    })
    .catch(error => console.log('Error when fetch neighborhoods:', error));
  }

  fetchEvents(data) {
    EventService.find(data)
    .then( ({objects}) => {
      let events = objects.sort((a, b) => moment(a.dt_evento).diff(moment(b.dt_evento), 'days'));
      let routes = this.state.routes.map((route, index) => {
        let filterd = events.filter(this.filters[index]);
        return update(route, { $merge: { events:filterd } });
      });
      this.setState({routes});
    })
    .catch(error => {
      console.log('Error when fetch events:', error);
    });
  }

  filterOpened({dt_evento:date}) {
    // Retorna os fluxos que não expiraram a data
    return moment(date).diff(moment(), 'days') > 0;
  }

  filterInFlux({usuario_id:creatorId}) {
    // Retorna os fluxos o usuário logado criou, (fazer exibir nesta lista também os que ele está participando)
    // Necessita recurso da API
    return creatorId === UserService.id;
  }

  filterHappening(event) {
    // Devera retornar todos os fluxos que conquistaram o numero de habilidades, materiais
    // Necessita recurso da API
    return true;
  }

  onSelectNeighborhoodHandle(index) {
    this.setState({neighborhood: this.state.neighborhoods[index]});
    this.fetchEvents({bairro_id: this.state.neighborhoods[index].id});
  }

  clearNeighborhood() {
    this.setState({neighborhood: null});
    this.fetchEvents();
  }

  handleChangeTab = index => this.setState({ index });

  renderLabel = scene => {
    let color = ['#FBC02D', '#7CB342', '#1E88E5'][scene.index];
    const labelStyle = { textAlign: 'center', color: '#424242', backgroundColor: 'transparent' }
    const boxStyle = { paddingHorizontal: 10, paddingTop: 10, paddingBottom: 4, marginBottom: 6};
    let label = scene.route.title;
    return (
      <View style={boxStyle}>
        <Text style={labelStyle}>{label}</Text>
      </View>
    );
  }



  renderHeader = props => <TabBar
    renderLabel={this.renderLabel}
    style={{backgroundColor: '#F5F5F5', height: 44, marginTop: -7,}}
    indicatorStyle={{backgroundColor: '#EEEEEE',}}
    labelStyle={{color: '#424242'}}
    tabStyle={{  }}
    {...props} />

  renderScene = SceneMap({
    '1': Tab,
    '2': Tab,
    '3': Tab,
  });

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.control}>
          <ModalDropdown style={styles.selectNeighborhood} options={this.state.neighborhoods.map(neighborhood => neighborhood.nome)}
            onSelect={index => { this.onSelectNeighborhoodHandle(index); }}
            dropdownStyle={styles.selectNeighborhoodModal}
            >
            <View>
              <TextInput
                editable={false}
                placeholder="SELECIONE O BAIRRO"
                value={this.state.neighborhood && `BAIRRO: ${this.state.neighborhood.nome}`}
                style={styles.input}
                underlineColorAndroid="transparent"
                ></TextInput>

              <TouchableOpacity onPress={() => {this.clearNeighborhood()}} disabled={!this.state.neighborhood} style={styles.selectNeighborhoodButton}>
                <Icon name={this.state.neighborhood ? 'cross' : 'chevron-small-down'} style={[styles.selectNeighborhoodIcon, this.state.neighborhood && styles.selectNeighborhoodIconChecked]}/>
              </TouchableOpacity>

            </View>
          </ModalDropdown>
        </View>


        <TabViewAnimated
          style={styles.tabContainer}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          onRequestChangeTab={this.handleChangeTab}
        />

        <TouchableRedirectorWrapper path="/app/flux-create-step-1" content={
          <View style={styles.btnActionDone}>
            <Text style={styles.btnActionDoneText}>CRIAR UM FLUXO</Text>
          </View>
        } />
      </View>
    );
  }
}

let heightCorrection = Platform.OS === 'ios' ? 70 : 75;
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - heightCorrection,
  },
  tabContainer: {
    flex: 1,
  },
  control: {
    // marginLeft: inputMargin,
    // marginRight: inputMargin,
  },
  inputLabel: {
    marginTop: 14,
    marginBottom: 10,
    marginLeft: 12,
    color: '#757575',
  },
  input: {
    height: 36,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#616161',
  },
  selectNeighborhood: {

  },
  selectNeighborhoodButton: {
    position: 'absolute',
    right: 0,
  },
  selectNeighborhoodIcon: {
    fontSize: 35,
    width: 44,
    textAlign: 'center',
    color: '#455A64',
    backgroundColor: 'transparent',
  },
  selectNeighborhoodIconChecked: {
    color: '#455A64',
    fontSize: 22,
    marginTop: 7,
  },
  selectNeighborhoodModal: {
    // width: Dimensions.get('window').width - inputMargin * 2,
    width: '100%',
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
