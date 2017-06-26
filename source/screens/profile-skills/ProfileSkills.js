import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import BarMenu from '../../common/components/bar-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';

export default class ProfileSkills extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pageTitle: 'Habilidades',
      skill: null,
      skills: [],
    };
  }

  addSkill() {
    let skills = this.state.skills.slice();

    skills.push({title: this.state.skill});

    this.setState(Object.assign({}, this.state, {
      skills,
      skill: null,
    }));
  }

  removeSkill() {
    console.log('Remove Skill');
  }

  renderSkills() {
    return this.state.skills.map((skill, index) => {
      return (
        <View style={styles.listItem} key={index}>
          <Text>{skill.title}</Text>
          <TouchableOpacity onPress={() => { this.removeSkill(); }} style={styles.itemRemoveIconWrapper}>
            <Icon name="minus" style={styles.itemRemoveIcon}/>
          </TouchableOpacity>
        </View>
      );
    });
  }

  resetTo(routeName) {
    return NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName})],
    });
  }

  done() {
    this.props.navigation.navigate('ProfileInterests');
  }

  render() {
    const { pageTitle } = this.state;
    const { navigation } = this.props;

    return (
      <BarMenu title={pageTitle} navigation={navigation}>
        <TouchableOpacity onPress={() => { this.addSkill(); }}>
          <Icon name="plus" style={styles.inputIcon} />
        </TouchableOpacity>

        <View style={styles.inputSection}>
          <TextInput
            placeholder="Adicione uma habilidade"
            onChangeText={ skill => {
              this.setState(Object.assign({}, this.state, {
                skill
              }));
            }}
            value={this.state.skill}
            style={styles.input}
            ></TextInput>
        </View>

        <ScrollView style={styles.list}>
          {this.renderSkills()}
        </ScrollView>

        <TouchableOpacity onPress={() => { this.done() }} style={styles.btnActionDone}>
          <Text style={styles.btnActionDoneText}>Próximo</Text>
        </TouchableOpacity>

      </BarMenu>
    );
  }

}

const styles = StyleSheet.create({
  inputSection: {
    marginRight: 38,
  },
  inputIcon: {
    position: 'absolute',
    marginLeft: 337,

    fontSize: 20,
    color: '#FFF',
    backgroundColor: '#7CB342',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#FAFAFA',
    color: '#37474F',
  },

  list: {
  },

  listItem: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    borderTopWidth: 1,


    borderColor: '#B0BEC5',
    backgroundColor: '#CFD8DC',
  },

  itemRemoveIconWrapper: {
    position: 'absolute',
    marginLeft: 348,
    marginTop: 10,
  },

  itemRemoveIcon: {
    fontSize: 20,
    color: '#b71c1c'
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
  }

});
