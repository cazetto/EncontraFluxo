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
  Dimensions,
  Platform
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

  componentWillReceiveProps(nextProps) {
    let availableItems = nextProps.available
    .filter(skill => {
      var add = true;
      for (var i = 0; i < nextProps.added.length; i++) {
        add = nextProps.added[i].id != skill.id;
        if(!add) break;
      }
      return add;
    });
    this.setState({availableItems, addedItems: nextProps.added});
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
    const availableItems = update(this.state.availableItems, {$push: [item]})
    const addedItems = this.state.addedItems.filter(current => current.id != item.id);
    this.setState({addedItems, availableItems});

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

  componentDidMount() {
    let timeout = setTimeout(() => {
      console.log(timeout);
      clearTimeout(timeout);
      this.refs.list.measure( (fx, fy, width, height, px, py) => {
        let marginBottom = 50;
        let androidCorrection = Platform.OS === 'android' ? 30 : 0;
        let listHeight = (Dimensions.get('window').height - (py + marginBottom)) - androidCorrection;
        this.setState({listHeight});
      });

    }, 0);
  }

  render() {
    return (
      <View style={styles.container}>
        <Select placeholder="ADICIONE UMA HABILIDADE" options={this.state.availableItems} onSelect={this.onSelectItemHandle.bind(this)} hideSelectedText></Select>
        <View ref="list" collapsable={false}>
          <ScrollView style={[styles.list, {height: this.state.listHeight}]}>
            {this.renderAddedItems()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  list: {
    marginTop: 4,
  },
  listItem: {
    paddingVertical: 14,
    paddingLeft: 10,
    marginBottom: 2,
    backgroundColor: '#FAFAFA',
  },
  itemRemoveIconWrapper: {
    position: 'absolute',
    right: 11,
    marginTop: 10,
  },
  itemRemoveIcon: {
    marginTop: 3,
    fontSize: 22,
    color: '#b71c1c'
  }
});
