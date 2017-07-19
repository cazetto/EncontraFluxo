import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Modal } from 'react-native';

import { Button } from 'react-native-elements';

export default class ModalConfirm extends Component {

  state = {
    modalVisible: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.isVisible
    });
  }

  render() {
    return (
      <View>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >

          <View style={styles.container}>
            <View style={styles.content}>
              <View>

                <Text style={styles.text}>{this.props.text}</Text>

                <View style={styles.buttons}>
                  <Button onPress={this.props.confirm} buttonStyle={styles.buttonConfirm} title={this.props.confirmText} />
                  <Button onPress={this.props.cancel} buttonStyle={styles.buttonCancel} title={this.props.cancelText} />
                </View>

              </View>
            </View>
          </View>

        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(38, 50, 56 , .9)'
  },
  content: {
    backgroundColor: '#CFD8DC',
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 20,
    marginTop: '-30%',
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor: '#B0BEC5',
  },
  text: {
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonConfirm: {
    backgroundColor: '#b71c1c',
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  buttonCancel: {
    backgroundColor: '#455A64',
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
});
