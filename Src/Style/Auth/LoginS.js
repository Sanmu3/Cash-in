import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FF8D27',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
  },
  box: {
    marginTop: '25%',
    width: 330,
    height: 380,
    // backgroundColor: '#373636',
    alignItems: 'center',
  },
  boxItem: {
    borderRadius: 30,
    marginTop: 50,
    width: '100%',
    height: '100%',
    backgroundColor: '#373636',
    justifyContent: 'flex-end',
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
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
  },
  rememberMe: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomText: {
    fontSize: 14,
    color: '#a9a9a9',
  },
  PassInputArea: {
    backgroundColor: '#4E4D4D',
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  visible: {
    width: 25,
    height: 25,
    marginRight: 15,
    tintColor: '#a9a9a9',
  },
});
