import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Modal, Clipboard } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import PeopleItem from './PeopleItem';

export default class CopyModal extends Component {
  state = {
    modalVisible: false,
  }

  componentWillMount() {
    let { contributors } = this.props;
    this.setState({contributors});
  }

  fetchEvent() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.isVisible
    });
  }

  renderPeople() {
    return this.state.contributors.map(contributor => {
      return <PeopleItem data={contributor} key={contributor.id} />;
    });
  }

  copy() {
    let contributorsString = this.state.contributors.reduce((accumulator, {nome, email, fone, habilidades, materiais}, index, array) => {
      let habilidadesString = habilidades.reduce((accumulator, {nome}, index, array) =>
      `${accumulator}${nome}${ index < (array.length-1) ? ',' : '.'} `, '');
      let materiaisString = materiais.reduce((accumulator, nome, index, array) =>
      `${accumulator}${nome}${ index < (array.length-1) ? ',' : '.'} `, '');
      return `${accumulator}Nome: ${nome}\nEmail: ${email}\nHabilidades: ${habilidadesString}\nMateriais: ${materiaisString}\n\n`;
    }, '');
    Clipboard.setString(contributorsString);
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
            <View style={styles.wrapper}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>PESSOAS CONECTADAS</Text>
                <TouchableOpacity onPress={()=>{this.props.close()}}>
                  <Icon name="circle-with-cross" style={styles.closeIcon} />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.content}>
                {this.renderPeople()}
              </ScrollView>

              <TouchableOpacity onPress={() => {this.copy()}} style={styles.btnCopy}>
                <Text style={styles.btnCopyText}>COPIAR DADOS</Text>
              </TouchableOpacity>

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
  wrapper: {
    backgroundColor: '#CFD8DC',
    padding: 10,
    borderRadius: 5,
    borderColor: '#B0BEC5',
    width: '90%',
    height: '80%',
  },
  header: {
    flexDirection: 'row',
    // alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 12,
    color: '#263238',
    fontWeight: '500',
  },
  closeIcon: {
    fontSize: 24,
    color: '#37474F',
  },
  content: {
    paddingTop: 10,
    paddingHorizontal: 6,
  },

  btnCopy: {
    backgroundColor: '#039BE5',
    padding: 8,
    borderRadius: 4,
  },
  btnCopyText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
    padding: 4,
  }
});
