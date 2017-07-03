import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions
} from 'react-native';

import _ from 'lodash';
import update from 'immutability-helper';

import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Entypo';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

import Select from '../../../components/select/Select';

import neighborhoods from '../../../static/neighborhoods';

import DatePicker from 'react-native-datepicker';

export default class FluxCreate extends Component {

  state = {
    name: '',
    address: '',
    neighborhood: ''
  }

  constructor(props) {
    super(props);
  }

  delayedChangeTextInput(field) {
    return (
      _.debounce(value => {
        let credentials = update(this.state, {$merge: {[field]:value}});
        this.setState({credentials});
      }, 100)
    );
  }

  onSelectNeighborhoodHandle(index) {
    this.setState({
      neighborhood: this.neighborhoods[index]
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          placeholder="NOME DO FLUXO"
          style={styles.input}
          defaultValue={this.state.name}
          onChangeText={this.delayedChangeTextInput('name')}
          autoCorrect={false}
          keyboardType="default"
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          ></TextInput>

        <TextInput
          placeholder="ONDE SERÁ REALIZADO"
          style={[styles.input, styles.inputMultiline]}
          defaultValue={this.state.address}
          onChangeText={this.delayedChangeTextInput('address')}
          autoCorrect={false}
          multiline={true}
          keyboardType="default"
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          ></TextInput>

        <Select placeholder="SELECIONE O BAIRRO" options={neighborhoods} ></Select>

        <DatePicker
          style={{width: 374}}
          date={this.state.date}
          mode="date"
          placeholder="DATA"
          format="DD-MM-YYYY"
          minDate="2016-05-01"
          maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
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
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />


        <TouchableRedirectorWrapper path="/create" content={
          <View style={styles.btnActionDone}>
            <Text style={styles.btnActionDoneText}>CONTINUAR</Text>
          </View>
        } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  inputMultiline: {
    height: 54,
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
