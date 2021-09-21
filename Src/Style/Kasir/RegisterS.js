import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Screen: {
    flex: 1,
  },
  Title: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  InputArea: {
    backgroundColor: '#c0c0c0',
    borderRadius: 10,
    padding: 5,
    margin: 15,
  },
  button: {
    backgroundColor: '#808080',
    width: 150,
    height: 50,
    alignSelf: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  PassInputArea: {
    backgroundColor: '#c0c0c0',
    borderRadius: 10,
    padding: 5,
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  visible: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
});
