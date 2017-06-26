import { StyleSheet } from 'react-native';
export default styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    width: null,
    height: null,
  },
  textInputs: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputWrapper: {
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    height: 40,
    marginTop: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  loginButtonColor: {
    backgroundColor: '#03A9F4',
  },
  registerButtonColor: {
    backgroundColor: '#FBC02D',
  },
  forgotButtonColor: {
    backgroundColor: '#8BC34A',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16
  },
  touchable: {
    margin: 4,
    padding: 14,
    marginHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  actions: {
    marginTop: 20,
    width: '100%',
  },
  loginIndicator: {
    marginTop: 4,
    marginBottom: 5,
  },
  toast: {
    backgroundColor:'#d32f2f',
  }
});
