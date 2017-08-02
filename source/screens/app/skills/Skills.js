import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Icon,
  Switch,
  Dimensions,
  Platform,
} from 'react-native';

import TouchableRedirectorWrapper from '../../../components/touchable-redirector-wrapper/TouchableRedirectorWrapper';

import UserService from '../../../services/UserService';
import SkillService from '../../../services/SkillService';

export default class Skills extends Component {

  state = {
    skills: [],
  };

  componentWillMount() {
    this.fetchSkills();
  }

  fetchSkills() {
    SkillService.find({ limit: 0 })
    .then(({objects}) => {
      let skills = objects.sort((a, b) => a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0);
      this.setState({skills});
      this.fetchUserProfile();
    })
    .catch(error => {});
  }

  fetchUserProfile() {
    UserService.get()
    .then(({habilidades:userSkills}) => {
      var skills = this.state.skills.map(skill => {
        skill.selected = userSkills.some(userSkill => skill.id == userSkill.id);
        return skill;
      });
      this.setState({skills});
    })
    .catch(error => {});
  }

  removeSkill() {
  }

  selectItem(index, value) {
    console.log(value);
    let skills = this.state.skills.slice();
    let current = skills[index].selected = value;
    this.setState({skills});

    let userSkills = skills.filter(skill => {
      return skill.selected;
    });

    UserService.update({habilidades: userSkills})
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  renderSkills() {
    return this.state.skills.map((skill, index) => {
      return (
        <View style={styles.listItem} key={index}>
          <Text style={styles.title}>{skill.nome}</Text>
          <Switch
            onValueChange={value => this.selectItem(index, value)}
            value={ skill.selected } />
        </View>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderLabel}>SELECIONE SUAS HABILIDADES</Text>
        </View>
        <ScrollView>
          {this.renderSkills()}
        </ScrollView>

        <TouchableRedirectorWrapper path="/app/interests" content={
          <View style={styles.btnActionDone}>
            <Text style={styles.btnActionDoneText}>CONTINUAR</Text>
          </View>
        } />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  listHeader: {
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF1',
    backgroundColor: '#F5F5F5',
  },
  listHeaderLabel: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF1',
    backgroundColor: '#FAFAFA',
  },
  title: {
    color: '#757575',
  },
  btnActionDone: {
    backgroundColor: '#455A64',
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
  },

});
