import {StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {IndicatorViewPager, ViewPager, PagerTitleIndicator, PagerDotIndicator, PagerTabIndicator} from 'rn-viewpager';


// Page One Imports
import DatePicker from 'react-native-datepicker';
import Select from '../../../components/select/Select';
import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';
import Icon from 'react-native-vector-icons/Entypo';
import update from 'immutability-helper';
import _ from 'lodash';

import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-BR');

// Services imports
import NeighborhoodService from '../../../services/NeighborhoodService';


export default class ViewPagerPage extends Component {

  state = {
    name: '',
    address: '',

    neighborhoods: [],
    neighborhood: null,
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.currentPage = 0;
    this.fetchNeighborhoods();
  }

  // FETCHES
  fetchNeighborhoods() {
    NeighborhoodService.find()
    .then( ({objects:neighborhoods}) => {
      this.setState({neighborhoods});
    });
  }

  delayedChangeTextInput(field) {
    return (
      _.debounce(value => {
        let credentials = update(this.state, {$merge: {[field]:value}});
        this.setState({credentials});
      }, 100)
    );
  }

  onNeighborhoodSelectHandle(neighborhood) {
    this.setState({neighborhood});
  }

  renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
    // return <PagerTitleIndicator titles={['one', 'two', 'three']} />;
  }

  nextPage() {
    this.refs.viewPager.setPage(this.currentPage+1);
  }

  onPageChange(event) {
    this.currentPage = event.position;
  }

  render() {
    let today = moment().format('DD-MM-YYYY');

    return (
      <View style={styles.container}>
        <IndicatorViewPager
          ref="viewPager"
          style={styles.indicatorViewPager}
          indicator={this.renderDotIndicator()}
          onPageSelected={event => {this.onPageChange(event)}} >
          <View style={styles.page}>
            <TextInput
              placeholder="NOME DO FLUXO"
              style={pageOneStyles.input}
              defaultValue={this.state.name}
              onChangeText={this.delayedChangeTextInput('name')}
              autoCorrect={false}
              keyboardType="default"
              autoCapitalize="none"
              underlineColorAndroid="transparent">
            </TextInput>
            <TextInput
              placeholder="ONDE SERÁ REALIZADO"
              style={[pageOneStyles.input, pageOneStyles.address]}
              defaultValue={this.state.address}
              onChangeText={this.delayedChangeTextInput('address')}
              autoCorrect={false}
              multiline={true}
              keyboardType="default"
              autoCapitalize="none"
              underlineColorAndroid="transparent">
            </TextInput>
            <Select
              placeholder="SELECIONE O BAIRRO"
              options={this.state.neighborhoods}
              defaultSelectedId={this.state.neighborhoodCurrentId}
              onSelect={this.onNeighborhoodSelectHandle.bind(this)}>
            </Select>
            <DatePicker
              style={pageOneStyles.datePicker}
              date={this.state.date}
              mode="date"
              placeholder="DATA"
              locale="pt-br"
              format="DD/MM/YYYY - dddd"
              minDate={today}
              maxDate="01-12-2017"
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
              onDateChange={(date) => {this.setState({date: date})}}
            />
            <TextInput
              placeholder="DESCRIÇÃO: Descreva o encontro ou a ação e lembre-se de detalhar porque você sugere este encontro, do que se trata e quais são os objetivos."
              style={[pageOneStyles.input, pageOneStyles.description]}
              defaultValue={this.state.description}
              onChangeText={this.delayedChangeTextInput('description')}
              autoCorrect={false}
              multiline={true}
              keyboardType="default"
              autoCapitalize="sentences"
              underlineColorAndroid="transparent">
            </TextInput>
          </View>
          <View style={styles.page}>
            <Text>page two</Text>
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

const styles = StyleSheet.create({
  container: {

    height: Dimensions.get('window').height - 74,
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
