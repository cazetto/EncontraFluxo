import { AsyncStorage } from 'react-native';

export const saveUser = user => {
  AsyncStorage.setItem('@UserStore', JSON.stringify(user));
}

export const getSavedUser = () => AsyncStorage.getItem('@UserStore');

export const removeSavedUser = () => AsyncStorage.removeItem('@UserStore');
