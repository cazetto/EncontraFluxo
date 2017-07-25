import React, {Component} from 'react';
import { Redirect } from 'react-router';
import {StyleSheet, View, TouchableOpacity, Text, Image, Linking, Dimensions } from 'react-native';

import logoImage from '../../../assets/images/logo.png';
import logoWelightImage from '../../../assets/images/logo-welight-light-bg.png';

export default class About extends Component {
  openSite() {
    Linking.openURL('http://www.encontrafluxo.com.br');
  }
  openWelightSite() {
    Linking.openURL('http://www.welight.co');
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={logoImage} style={styles.logo}></Image>
        <Text style={styles.text}>O Encontra Fluxo foi criado para todas as pessoas que desejam se engajar mais com o local onde moram, no Rio de Janeiro, ajudando a criar uma cidade mais sustentável e colaborativa!</Text>
        <Text style={styles.text}>O aplicativo nasceu em um Hackathon (maratona de desenvolvimento) produzida pelo Welight, onde 30 jovens, de diferentes lugares do Rio de Janeiro se encontraram, durante um final de semana, para criar soluções para a Cidade Maravilhosa!</Text>
        <Text style={styles.text}>Para mais informações acesse:</Text>
        <TouchableOpacity onPress={this.openSite}>
          <Text style={styles.link}>www.encontrafluxo.com.br</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.openWelightSite} onPress={this.openWelightSite}>
          <Text style={styles.link}>www.welight.co</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoWelightButton} onPress={this.openWelightSite}>
          <Image source={logoWelightImage} style={styles.logoWelight}></Image>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: '50%',
    height: 120,
    marginBottom: 10,
  },
  text: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#455A64',
    fontWeight: '100'
  },

  logoWelightButton: {
    position: 'absolute',
    right: 14,
    top: Dimensions.get('window').height - 170,
    width: 100,
  },
  logoWelight: {
    resizeMode: 'contain',
    width: 100,
  },

  openWelightSite: {
    position: 'absolute',
    left: 14,
    width: 135,
    top: Dimensions.get('window').height - 80,
  },
  link: {
    color: '#0277BD',
    marginTop: -6,
    fontWeight: '500'
  }
});
