import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, Dimensions, Platform, TouchableOpacity } from 'react-native';

import update from 'immutability-helper';
import moment from 'moment';

import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Entypo';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

import NeighborhoodService from '../../../services/NeighborhoodService';
import EventService from '../../../services/EventService';
import UserService from '../../../services/UserService';

import FluxList from '../../../components/flux-list/FluxList';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      neighborhood: null,
      neighborhoods: [],

      events: [],
    };
  }

  componentWillMount() {
    this.fetchNeighborhoods();

    // http://104.155.190.178/api/v1/evento/23/?username=andre@welight.co&api_key=71f359d5168dac806ed87eebd33a3d72f59e79ad

    this.fetchOpen();
    // this.fetchInFlux();
    // this.fetchHappening();
  }
  
  fetchOpen() {
    EventService.find()
    .then(({objects:events}) => {
      console.log(events);
      this.setState({events});
    })
    .catch(error => {
      console.log('Error fetching open events', error);
    })
  }

  fetchInFlux() {
    // EventService.findInFlux()
    EventService.find()
    .then(({objects:events}) => {
      console.log(events);
      // this.setState({events})
    })
    .catch(error => {
      console.log('Error fetching open events', error);
    })
  }

  fetchHappening() {
    EventService.findHappening()
    .then(({objects:events}) => {
      console.log(events);
      this.setState({events});
    })
    .catch(error => {
      console.log('Error fetching open events', error);
    })
  }

  fetchNeighborhoods() {
    NeighborhoodService.find()
    .then(({objects}) => {
      let neighborhoods = objects.sort((a, b) => a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0);
      this.setState({neighborhoods});
    })
    .catch(error => console.log('Error when fetch neighborhoods:', error));
  }

  onSelectNeighborhoodHandle(index) {
    this.setState({neighborhood: this.state.neighborhoods[index]});
  }

  clearNeighborhood() {
    this.setState({neighborhood: null});
  }

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

          <View style={styles.filterBar}>

            <TouchableOpacity onPress={() => { this.fetchOpen() }} style={[styles.filterBarButton, styles.filterBarButton1]}>
              <Text style={styles.filterBarButtonText}>Aberto</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { this.fetchInFlux() }} style={[styles.filterBarButton, styles.filterBarButton2]}>
              <Text style={styles.filterBarButtonText}>No Fluxo</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { this.fetchHappening() }} style={[styles.filterBarButton, styles.filterBarButton3]}>
              <Text style={styles.filterBarButtonText}>Rolou</Text>
            </TouchableOpacity>

          </View>

        </View>

        <FluxList items={this.state.events} color="#FDD835"></FluxList>

        <TouchableRedirectorWrapper path="/app/flux-create-step-1" content={
          <View style={styles.btnActionDone}>
            <Text style={styles.btnActionDoneText}>CRIAR UM FLUXO</Text>
          </View>
        } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - (Platform.OS === 'ios' ? 56 : 75),
  },

  control: {
    // marginLeft: inputMargin,
    // marginRight: inputMargin,
  },

  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ECEFF1',
  },
  filterBarButton: {
    width: '33.33%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
  },

  filterBarButton1: {
    borderBottomColor: '#FBC02D',
  },
  filterBarButton2: {
    borderBottomColor: '#7CB342',
  },
  filterBarButton3: {
    borderBottomColor: '#1E88E5',
  },

  filterBarButtonText: {
    color: '#37474F',
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
    backgroundColor: '#7CB342',
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
