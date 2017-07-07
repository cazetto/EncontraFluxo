import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Dimensions,
  Platform
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Entypo';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

import neighborhoods from '../../../static/neighborhoods';

import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import OpenedTab from './tabs/OpenedTab';
import InFluxTab from './tabs/InFluxTab';
import HappeningTab from './tabs/HappeningTab';

// const Opened = () => <View style={[ styles.container, { borderTopWidth: 1, borderColor: '#FDD835' } ]} />;
// const InFlux = () => <View style={[ styles.container, { borderTopWidth: 1, borderColor: '#7CB342' } ]} />;
// const Happening = () => <View style={[ styles.container, { borderTopWidth: 1, borderColor: '#1E88E5' } ]} />;

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      neighborhood: null,

      index: 0,
      routes: [
        { key: '1', title: 'Aberto' },
        { key: '2', title: 'No Fluxo' },
        { key: '3', title: 'Acontecendo' },
      ],
    };
    this.neighborhoods = neighborhoods;
  }

  onSelectNeighborhoodHandle(index) {
    this.setState({
      neighborhood: this.neighborhoods[index]
    });
  }

  handleChangeTab = index => this.setState({ index });

  renderLabel = scene => {
    let color = ['#FBC02D', '#7CB342', '#1E88E5'][scene.index];
    const labelStyle = { textAlign: 'center', color: '#424242', backgroundColor: 'transparent' }
    const boxStyle = { borderBottomWidth: 2, borderBottomColor: color, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 4, marginBottom: 6};
    let label = scene.route.title;
    return (
      <View style={boxStyle}>
        <Text style={labelStyle}>{label}</Text>
      </View>
    );
  }

  renderHeader = props => <TabBar
    renderLabel={this.renderLabel}
    style={{backgroundColor: '#F5F5F5'}}
    indicatorStyle={{backgroundColor: '#EEEEEE', height: '100%'}}
    labelStyle={{color: '#424242'}}
    tabStyle={{  }}
    {...props} />

  renderScene = SceneMap({
    '1': OpenedTab,
    '2': InFluxTab,
    '3': HappeningTab,
  });

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.control}>
          <Text style={styles.inputLabel}>Filtrar fluxos por bairro:</Text>
          <ModalDropdown style={styles.selectNeighborhood} options={this.neighborhoods}
            onSelect={index => { this.onSelectNeighborhoodHandle(index); }}
            dropdownStyle={styles.selectNeighborhoodModal}
            >
            <View>
              <TextInput
                editable={false}
                placeholder="SELECIONE O BAIRRO"
                value={this.state.neighborhood && `BAIRRO: ${this.state.neighborhood}`}
                style={styles.input}
                ></TextInput>
              <Icon name={this.state.neighborhood ? 'check' : 'chevron-small-down'} style={[styles.selectNeighborhoodIcon, this.state.neighborhood && styles.selectNeighborhoodIconChecked]}/>
            </View>
          </ModalDropdown>
        </View>
        <TabViewAnimated
          style={styles.tabContainer}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          onRequestChangeTab={this.handleChangeTab}
        />

        <TouchableRedirectorWrapper path="/flux/create" content={
          <View style={styles.btnActionDone}>
            <Text style={styles.btnActionDoneText}>CRIAR UM FLUXO</Text>
          </View>
        } />
      </View>
    );
  }
}

let heightCorrection = Platform.OS === 'ios' ? 70 : 75;
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - heightCorrection,
  },
  tabContainer: {
    flex: 1,
  },
  control: {
    // marginLeft: inputMargin,
    // marginRight: inputMargin,
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
  selectNeighborhoodIcon: {
    position: 'absolute',
    right: 0,
    fontSize: 35,
    width: 44,
    textAlign: 'center',
    color: '#BF360C',
    backgroundColor: 'transparent',
  },
  selectNeighborhoodIconChecked: {
    color: '#BF360C',
    fontSize: 20,
    color: '#8BC34A',
    marginTop: 7,
  },
  selectNeighborhoodModal: {
    // width: Dimensions.get('window').width - inputMargin * 2,
    width: '100%',
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
