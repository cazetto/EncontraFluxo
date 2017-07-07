import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, Platform} from 'react-native';
import {IndicatorViewPager, ViewPager, PagerTitleIndicator, PagerDotIndicator, PagerTabIndicator} from 'rn-viewpager';

import DatePicker from 'react-native-datepicker';
import Select from '../../../components/select/Select';
import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';
import ItemDistributionList from '../../../components/item-distribution-list/ItemDistributionList';
import Icon from 'react-native-vector-icons/Entypo';
import update from 'immutability-helper';
import _ from 'lodash';

import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-BR');

// Services imports
import NeighborhoodService from '../../../services/NeighborhoodService';
import SkillService from '../../../services/SkillService';
import UserService from '../../../services/UserService';

export default class ViewPagerPage extends Component {
  state = {
    neighborhoods: [],
    neighborhood: null,

    availableSkills: [],

    eventData: {
      nome: null,
      endereco: null,
      bairro_id: null,
      dt_evento: null,
      descricao: null,
      habilidades: [],
      interesses: [],
    },
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.currentPage = 0;
    this.fetchNeighborhoods();
    this.fetchSkills();
  }

  // Fetches
  fetchNeighborhoods() {
    NeighborhoodService.find()
    .then( ({objects:neighborhoods}) => {
      this.setState({neighborhoods});
    });
  }

  fetchSkills() {
    SkillService.find()
    .then(response => this.setState({availableSkills: response.objects}))
    .catch(error => console.log('Error on fetch skills:', error));
  }

  // fetchUserProfile() {
  //   UserService.get()
  //   .then(response => {
  //     this.setState({userSkills: response.habilidades, neighborhoodCurrentId:response.bairro_id});
  //     this.fetchSkills();
  //   });
  // }

  // Handles
  onNeighborhoodSelectHandle(neighborhood) {
    let eventData = update(this.state.eventData, {$merge: {bairro_id:neighborhood.id}});
    this.setState({neighborhood, eventData});
  }
  onChangeDateHandle(date) {
    this.setState({ eventData: update(this.state.eventData, {$merge: {dt_evento:date}}) })
  }

  // Pages handles
  nextPage() {
    // console.log(this.state.eventData);
    this.refs.viewPager.setPage(this.currentPage+1);
  }
  onPageChange(event) {
    this.currentPage = event.position;
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

  // Renderes
  renderDotIndicator() {
    return <PagerDotIndicator pageCount={4} />;
    // return <PagerTitleIndicator titles={['Início', 'Habilidades', 'Material', 'Interesses']} />;
  }

  render() {
    // today
    let minDate = moment().format('DD-MM-YYYY');
    let maxDate = moment().add(1, 'year').calendar();

    return (
      <View style={styles.container}>
        <IndicatorViewPager
          initialPage={1}
          ref="viewPager"
          style={styles.indicatorViewPager}
          indicator={this.renderDotIndicator()}
          onPageSelected={event => {this.onPageChange(event)}} >
          <View style={styles.page}>
            <TextInput
              placeholder="NOME DO FLUXO"
              style={pageOneStyles.input}
              defaultValue={this.state.eventData.nome}
              onChangeText={this.delayedChangeTextInput('nome')}
              autoCorrect={false}
              keyboardType="default"
              autoCapitalize="none"
              underlineColorAndroid="transparent">
            </TextInput>
            <TextInput
              placeholder="ONDE SERÁ REALIZADO"
              style={[pageOneStyles.input, pageOneStyles.address]}
              defaultValue={this.state.eventData.endereco}
              onChangeText={this.delayedChangeTextInput('endereco')}
              autoCorrect={false}
              multiline={true}
              keyboardType="default"
              autoCapitalize="none"
              underlineColorAndroid="transparent">
            </TextInput>
            <Select
              placeholder="SELECIONE O BAIRRO"
              options={this.state.neighborhoods}
              defaultSelectedId={this.state.eventData.bairro_id}
              onSelect={this.onNeighborhoodSelectHandle.bind(this)}>
            </Select>
            <DatePicker
              style={pageOneStyles.datePicker}
              date={this.state.eventData.dt_evento}
              mode="date"
              placeholder="DATA"
              locale="pt-br"
              format="DD/MM/YYYY"
              minDate={minDate}
              maxDate={maxDate}
              confirmBtnText="Confirmar"
              cancelBtnText="Cancelar"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 4,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  height: 36,
                  padding: 10,
                  marginVertical: 2,
                  marginHorizontal: 4,
                  backgroundColor: '#FAFAFA',
                  borderColor: '#EEEEEE',
                  borderWidth: 1,
                  borderRadius: 2,
                  alignItems: 'flex-start',
                },
                placeholderText: {
                  fontSize: 16,
                  color: '#C3C3C3',
                },
                // placeholderTextColor
                dateText: {
                  fontSize: 16,
                  color: '#616161',
                }
              }}
              onDateChange={(date) => { this.onChangeDateHandle(date) }}
            />
            <TextInput
              placeholder="DESCRIÇÃO: Descreva o encontro ou a ação e lembre-se de detalhar porque você sugere este encontro, do que se trata e quais são os objetivos."
              style={[pageOneStyles.input, pageOneStyles.description]}
              defaultValue={this.state.eventData.descricao}
              onChangeText={this.delayedChangeTextInput('descricao')}
              autoCorrect={false}
              multiline={true}
              keyboardType="default"
              autoCapitalize="sentences"
              underlineColorAndroid="transparent">
            </TextInput>
          </View>
          <View style={styles.page}>

            <ItemDistributionList available={this.state.availableSkills} />

          </View>
          <View style={styles.page}>
            <Text>page three</Text>
          </View>
        </IndicatorViewPager>

        <TouchableOpacity onPress={() => {this.nextPage()}}>
          <View style={pageOneStyles.btnActionDone}>
            <Text style={pageOneStyles.btnActionDoneText}>CONTINUAR</Text>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

let heightCorrection = Platform.OS === 'ios' ? 118 : 126;
const styles = StyleSheet.create({
  container: {

    height: Dimensions.get('window').height - heightCorrection,
  },
  indicatorViewPager: {
    height: Dimensions.get('window').height - 120,
  },
  page: {
    backgroundColor: "#F5F5F5",
  }
});



const pageOneStyles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 70,
    marginTop: 4,
  },

  questionLabel: {
    marginTop: 14,
    marginBottom: 10,
    marginLeft: 12,
    color: '#757575',
  },

  datePicker: {
    width: Dimensions.get('window').width,
  },

  input: {
    height: 36,
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 4,
    fontSize: 16,
    color: '#616161',
    backgroundColor: '#FAFAFA',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 2,
  },
  address: {
    height: 54,
  },
  description: {
    height: Dimensions.get('window').height -340,
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
