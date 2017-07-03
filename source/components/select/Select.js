import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Entypo';

export default class Select extends Component {
  state = {
    selected: null,
    selectedText: null,
  }

  onSelectHandle(index) {
    this.setState({selected: this.props.options[index]});
  }

  render() {
    return (
      <ModalDropdown style={styles.select} options={this.props.options}
        onSelect={index => { this.onSelectHandle(index); }}
        dropdownStyle={styles.selectModal}
        >
        <View>
          <TextInput
            editable={false}
            placeholder={this.props.placeholder}
            value={this.state.selectedText}
            style={styles.input}
            ></TextInput>
          <Icon name={this.state.selectedText ? 'check' : 'chevron-small-down'} style={[styles.selectIcon, this.state.selectedText && styles.selectIconChecked]}/>
        </View>
      </ModalDropdown>
    );
  }
}

const styles = StyleSheet.create({
  select: {

  },
  selectIcon: {
    position: 'absolute',
    right: 0,
    fontSize: 35,
    width: 44,
    textAlign: 'center',
    color: '#BF360C',
    backgroundColor: 'transparent',
  },
  selectIconChecked: {
    color: '#BF360C',
    fontSize: 20,
    color: '#8BC34A',
    marginTop: 7,
  },
  selectModal: {
    width: '100%',
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
});
