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
import MaterialService from '../../../services/MaterialService';
import InterestService from '../../../services/InterestService';

export default class ViewPagerPage extends Component {
  state = {
    neighborhoods: [],
    neighborhood: null,

    availableSkills: [],
    addedSkills: [],

    availableInterests: [],
    addedInterests: [],

    availableMaterials: [
      {id: 1, nome: "Material Estático 1"},
      {id: 2, nome: "Material Estático 2"},
      {id: 3, nome: "Material Estático 3"},
      {id: 4, nome: "Material Estático 4"},
      {id: 5, nome: "Material Estático 5"},
      {id: 6, nome: "Material Estático 6"},
      {id: 7, nome: "Material Estático 7"},
    ],
    addedMaterials: [],

    nextButtonLabel: 'CONTINUAR',

    eventData: {
      nome: null,
      endereco: null,
      bairro_id: null,
      dt_evento: null,
      descricao: null,
      habilidades: [],
      interesses: [],
      materiais: [],
    },
  }

  constructor(props) {
    super(props);
    this.nextButtonLabels = {1: 'CONTINUAR', 0: 'CONTINUAR', 2: 'CONTINUAR', 3: 'FINALIZAR', 4: 'SHOW!' };
    this.currentPage = 0;
  }

  componentWillMount() {
    this.fetchNeighborhoods();
    this.fetchSkills();
    // this.fetchMaterials();
    this.fetchInterests();
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
    .then(({objects:availableSkills}) => this.setState({availableSkills}))
    .catch(error => console.log('Error when fetching skills.'));
  }

  fetchMaterials() {
    MaterialService.find()
    .then(response => {
      // console.log('fetchMaterials', response);
    });
    // .then(({objects:availableMaterials}) => this.setState({availableMaterials}))
    // .catch(error => console.log('Error when fetching materials.'));
  }

  fetchInterests() {
    InterestService.find()
    .then(({objects:availableInterests}) => {
      this.setState({availableInterests});
    })
    .catch(error => {});
  }

  fetchFlux() {
    // EventService.get()
    // .then(response => {
    //   this.setState({addedSkills: response.habilidades});
    // })
    // .catch(error => console.log('Error when fetching event data.'))
  }

  // Handles
  onNeighborhoodSelectHandle(neighborhood) {
    let eventData = update(this.state.eventData, {$merge: {bairro_id:neighborhood.id}});
    this.setState({neighborhood, eventData});
  }
  onChangeDateHandle(date) {
    this.setState({ eventData: update(this.state.eventData, {$merge: {dt_evento:date}}) })
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

  onChangeSkillsHandle(addedSkills, availableSkills) {
    let habilidades = this.state.eventData.habilidades.slice();
    addedSkills.forEach(addedSkill => {
      let has = habilidades.some(habilidade => habilidade.id === addedSkill.id);
      if(!has) habilidades.push(addedSkill);
    });
    let eventData = update(this.state.eventData, {$merge: {habilidades}});
    this.setState({addedSkills, availableSkills, eventData});
  }

  onChangeMaterialsHandle(addedMaterials, availableMaterials) {
    let materiais = this.state.eventData.materiais.slice();
    addedMaterials.forEach(addedMaterial => {
      let has = materiais.some(material => material.id === addedMaterial.id);
      if(!has) materiais.push(addedMaterial);
    });
    let eventData = update(this.state.eventData, {$merge: {materiais}});
    this.setState({addedMaterials, availableMaterials, eventData});
  }

  onChangeInterestsHandle(addedInterests, availableInterests) {
    let interesses = this.state.eventData.interesses.slice();
    addedInterests.forEach(addedInterest => {
      let has = interesses.some(interest => interest.id === addedInterest.id);
      if(!has) interesses.push(addedInterest);
    });
    let eventData = update(this.state.eventData, {$merge: {interesses}});
    this.setState({addedInterests, availableInterests, eventData});
  }

  next() {
    if(this.currentPage === 4) {
      console.log('FINALIZAR');
    } else {
      this.refs.viewPager.setPage(this.currentPage+1);
    }
  }

  onPageChange({position}) {
    this.currentPage = position;

    this.setState({nextButtonLabel: this.nextButtonLabels[position]})
    console.log(position);
  }

  // Renderes
  renderDotIndicator() {
    return <PagerDotIndicator pageCount={5} />;
    // return <PagerTitleIndicator titles={['Início', 'Habilidades', 'Material', 'Interesses']} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <IndicatorViewPager
          // initialPage={3}
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
              minDate={ moment().format('DD-MM-YYYY') }
              maxDate={ moment().add(1, 'year').calendar() }
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
                  backgroundColor: '#FAFAFA',
                  borderWidth: 0,
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
            <Text style={styles.inputLabel}>Para tornar este fluxo possível, pessoas com as quais habilidades devem fazer parte?</Text>
            <ItemDistributionList
              available={this.state.availableSkills}
              added={this.state.addedSkills}
              onAddedItemsChanged={(available, added) => this.onChangeSkillsHandle(available, added)}
            />
          </View>
          <View style={styles.page}>
            <Text style={styles.inputLabel}>É necessário algum material para que este fluxo aconteça? (opcional)</Text>
            <ItemDistributionList
              placeholder="ADICIONE UM MATERIAL"
              available={this.state.availableMaterials}
              added={this.state.addedMaterials}
              onAddedItemsChanged={(available, added) => this.onChangeMaterialsHandle(available, added)}
            />
          </View>
          <View style={styles.page}>
            <Text style={styles.inputLabel}>Você pretende reunir pessoas com quais interesses?</Text>
            <ItemDistributionList
              placeholder="ADICIONE UM INTERESSE"
              available={this.state.availableInterests}
              added={this.state.addedInterests}
              onAddedItemsChanged={(available, added) => this.onChangeInterestsHandle(available, added)}
            />
          </View>

          <View style={styles.page}>
            <Text>FINALIZAR</Text>
          </View>

        </IndicatorViewPager>

        <TouchableOpacity onPress={() => {this.next()}}>
          <View style={pageOneStyles.btnActionDone}>
            <Text style={pageOneStyles.btnActionDoneText}>{this.state.nextButtonLabel}</Text>
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
    paddingHorizontal: 10,
    paddingTop: 2,
  },
  inputLabel: {
    marginTop: 10,
    marginBottom: 4,
    marginLeft: 12,
    color: '#757575',
  },
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
    width: Dimensions.get('window').width - 20,
  },

  input: {
    height: 36,
    padding: 10,
    marginVertical: 2,
    fontSize: 16,
    color: '#616161',
    backgroundColor: '#FAFAFA',
  },
  address: {
    height: 54,
  },
  description: {
    height: Dimensions.get('window').height -340,
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
