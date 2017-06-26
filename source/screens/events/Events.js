import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import BarMenu from '../../common/components/bar-menu';

import Tabs from 'react-native-tabs';

import EventsListComponent from './EventsListComponent';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Events extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'Eventos',
      page: 'all',
    };
  }

  onSearchPress() {
    console.log('onSearchPress');
  }

  done() {

  }

  render() {
    const { pageTitle } = this.state;
    const { navigation } = this.props;

    return (
      <BarMenu title={pageTitle} navigation={navigation}>

        <View style={styles.container}>

          <View style={styles.inputWrap}>
            <TextInput
              ref={(input) => { this.textInput = input; }}
              style={styles.input}
              placeholder={"Buscar evento"}
              value={this.state.query}
              onChangeText={text => this.setState({ query: text })}
            />
          </View>

          <View style={styles.action}>
            <TouchableOpacity onPress={(event) => { this.onSearchPress(); }}>
              <Icon name="search" style={styles.searchIcon} />
            </TouchableOpacity>
          </View>

          <EventsListComponent filter={this.state.page} />
          <Tabs selected={this.state.page} style={{backgroundColor:'white'}} selectedStyle={{color:'#607D8B'}} onSelect={el=>this.setState({page:el.props.name})}>
            <Text name="all" selectedIconStyle={{borderTopWidth:2,borderTopColor:'#EEEEEE', backgroundColor: '#EEEEEE'}}>Todos</Text>
            <Text name="mine" selectedIconStyle={{borderTopWidth:2,borderTopColor:'#EEEEEE', backgroundColor: '#EEEEEE'}}>Meus</Text>
          </Tabs>

        </View>

        <TouchableOpacity onPress={() => { this.done() }} style={styles.btnActionDone}>
          <Text style={styles.btnActionDoneText}>CRIAR AÇÃO</Text>
        </TouchableOpacity>

      </BarMenu>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  btnActionDone: {
    backgroundColor: '#FBC02D',
    padding: 8,
    margin: 3,
    borderRadius: 3,
  },
  btnActionDoneText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
  },

  searchIcon: {
    backgroundColor: '#fff',
    color: '#09a6d3',
    fontSize: 21,
  },
  inputWrap: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    height: 40,
  },

  action: {
    position: 'absolute',
    marginLeft: Dimensions.get('window').width -38,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
