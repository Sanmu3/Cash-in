import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 300,
    height: 300,
    backgroundColor: '#373636',
    borderRadius: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputArea: {
    backgroundColor: '#4E4D4D',
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#4E4D4D',
    width: 110,
    height: 40,
    alignSelf: 'center',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 14,
    color: '#A9A9A9',
  },
});
