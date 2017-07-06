// React imports
import React, { Component } from 'react';
// React Native imports
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';

// Other vendors imports
import update from 'immutability-helper';
import Icon from 'react-native-vector-icons/Entypo';

// Custom components imports
import Select from '../select/Select';

export default class ItemDistributionList extends Component {
  state = {
    availableItems: [],
    addedItems: [],
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    console.log('ItemDistributionList:componentWillReceiveProps', );
    this.setState({availableItems: nextProps.available, addedItems: nextProps.added});
  }

  onSelectItemHandle(item) {
    const addedItems = update(this.state.addedItems, {$push: [item]});
    const availableItems = this.state.availableItems.slice()
    .filter(current => {
      return current.id != item.id;
    });
    this.setState({addedItems, availableItems});
    // let itemsToUpdate = addedItems.map(({id}) => ({id}));
    this.addedItemsChanged(addedItems);
  }

  onRemoveItemHandle(item) {
    const addedItems = this.state.addedItems.filter(current => current.id != item.id);
    this.setState({addedItems});
    this.addedItemsChanged(addedItems);
  }

  renderAddedItems() {
    return this.state.addedItems.map((item, index) => {
      return (
        <View style={styles.listItem} key={index}>
          <Text>{item.nome}</Text>
          <TouchableOpacity onPress={() => { this.onRemoveItemHandle(item); }} style={styles.itemRemoveIconWrapper}>
            <Icon name="minus" style={styles.itemRemoveIcon}/>
          </TouchableOpacity>
        </View>
      );
    });
  }

  addedItemsChanged(addedItems) {
    this.props.onAddedItemsChanged(addedItems);
  }

  render() {
    console.log('ItemDistributionList----this.state.availableItemsthis.state.availableItems',this.state.availableItems);
    return (
      <View style={styles.container}>
        <Select placeholder="ADICIONE UMA HABILIDADE" options={this.state.availableItems} onSelect={this.onSelectItemHandle.bind(this)} hideSelectedText></Select>
        <ScrollView style={styles.list}>
          {this.renderAddedItems()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  list: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ECEFF1',
  },
  listItem: {
    paddingVertical: 14,
    paddingLeft: 10,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#ECEFF1',
    backgroundColor: '#FAFAFA',
  },
  itemRemoveIconWrapper: {
    position: 'absolute',
    right: 20,
    marginTop: 10,
  },
  itemRemoveIcon: {
    marginTop: 3,
    fontSize: 20,
    color: '#b71c1c'
  }
});
