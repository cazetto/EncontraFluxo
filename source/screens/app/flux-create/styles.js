import {StyleSheet, Dimensions, Platform} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  input: {
    height: 36,
    padding: 10,
    marginVertical: 2,
    fontSize: 16,
    textAlignVertical: 'top',
    color: '#616161',
    backgroundColor: '#FAFAFA',
  },
  address: {
    height: 83,
  },
  description: {
    height: Dimensions.get('window').height - (Platform.OS === 'ios' ? 329 : 337),
  },
  datePicker: {
    width: Dimensions.get('window').width - 20,
  },
  listHeader: {
    padding: 14,
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
  listItemTitle: {
    color: '#757575',
  },
  inputLabel: {
    marginTop: 10,
    marginBottom: 4,
    marginLeft: 4,
    color: '#757575',
  },
  addMaterialButton: {
    position: 'absolute',
    marginTop: 66,
    right: 20,
  },
  addMaterialIcon: {
    fontSize: 20,
    color: '#37474F',
    backgroundColor: 'transparent',
  },
  materialList: {
    height: Dimensions.get('window').height - (Platform.OS === 'ios' ? 209 : 218),
    marginTop: 4,
  },
  materialListItem: {
    padding: 10,
    marginBottom: 2,
    backgroundColor: '#FAFAFA',
  },
  materialItemRemoveIconWrapper: {
    position: 'absolute',
    right: 11,
    marginTop: 5,
  },
  materialItemRemoveIcon: {
    marginTop: 3,
    fontSize: 22,
    color: '#b71c1c'
  },
  activityIndicator: {
    marginTop: '50%',
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
  },
});
