import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Entypo';

export default class Select extends Component {
  state = {
    selected: null,
    options: [],
  }
  
  componentWillReceiveProps(nextProps) {
    let options = nextProps.options.map(option => {
      return option.nome || '';
    });
    if(nextProps.defaultSelectedId) {
      let selected = nextProps.options.filter(option => {
        return option.id === nextProps.defaultSelectedId;
      })[0];
      this.setState({selected: selected.nome});
    }
    this.setState({options});
  }

  onSelectHandle(index) {
    this.setState({selected: this.props.options[index].nome});
    this.props.onSelect(this.props.options[index]);
  }

  render() {
    return (
      <ModalDropdown style={styles.select} textStyle={{color: 'red'}} options={this.state.options}
        onSelect={index => { this.onSelectHandle(index); }}
        dropdownStyle={styles.selectModal}
        >
        <View>
          <TextInput
            editable={false}
            placeholder={this.props.placeholder}
            value={this.props.hideSelectedText ? '' : this.state.selected}
            dropdownTextHighlightStyle={{backgroundColor:'red'}}
            dropdownTextStyle={{backgroundColor:'red'}}
            style={styles.input}
            ></TextInput>
          <Icon name={this.state.selected ? 'check' : 'chevron-small-down'} style={[styles.selectIcon, this.state.selected && styles.selectIconChecked]}/>
        </View>
      </ModalDropdown>
    );
  }
}

const inputMargin = 10;
const styles = StyleSheet.create({
  select: {

  },
  selectIcon: {
    position: 'absolute',
    top: 5,
    right: 0,
    fontSize: 30,
    width: 44,
    textAlign: 'center',
    color: '#BF360C',
    backgroundColor: 'transparent',
  },
  selectIconChecked: {
    color: '#BF360C',
    fontSize: 18,
    color: '#8BC34A',
    marginTop: 5,
  },
  selectModal: {
    width: Dimensions.get('window').width - inputMargin * 2,
  },

  input: {
    height: 36,
    padding: 10,
    marginVertical: 2,
    fontSize: 16,
    color: '#616161',
    backgroundColor: '#FAFAFA',

  },
});
