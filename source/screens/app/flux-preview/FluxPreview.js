import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions
} from 'react-native';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

export default class FluxPreview extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <View style={styles.container}>


        <TouchableRedirectorWrapper path="/create" content={
          <View style={styles.btnActionDone}>
            <Text style={styles.btnActionDoneText}>ENTRAR NESSE FLUXO</Text>
          </View>
        } />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 70,
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
