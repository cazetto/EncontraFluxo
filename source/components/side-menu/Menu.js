import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default Menu = (
  <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
    <List containerStyle={{marginBottom: 20}}>
      <ListItem
        roundAvatar
        onPress={() => console.log('Pressed')}
        avatar={'https://cdn1.iconfinder.com/data/icons/brown-monsters/1024/Brown_Monsters_1-01.png'}
        key={1}
        title={'xxx'}
        subtitle={'xxxx'}
      />
    </List>
  </View>
);
