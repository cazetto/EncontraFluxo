import { AsyncStorage } from 'react-native';

export const saveUser = user => {
  AsyncStorage.setItem('@UserStore', JSON.stringify(user));
}

export const getSavedUser = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('@UserStore', (error, user) => {
      if(user) return resolve(JSON.parse(user));
      else return reject({ status: 'There\'s no saved token.' });
    });
  });
}

export const removeSavedUser = () => AsyncStorage.removeItem('@UserStore');
