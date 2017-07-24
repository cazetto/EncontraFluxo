import {StyleSheet, Dimensions, Platform} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  input: {
    height: 36,
    padding: 10,
    marginVertical: 2,
    fontSize: 16,
    color: '#616161',
    backgroundColor: '#FAFAFA',
  },
  address: {
    height: 83,
  },
  description: {
    height: Dimensions.get('window').height -325,
  },
  datePicker: {
    width: Dimensions.get('window').width - 20,
  },
  inputLabel: {
    marginTop: 10,
    marginBottom: 4,
    marginLeft: 4,
    color: '#757575',
  },
  btnActionDone: {
    backgroundColor: '#455A64',
    padding: 8,
    margin: 3,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  btnActionDoneDisabled: {
    opacity: .5,
  },
  btnActionDoneText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
    padding: 4
  }
});
