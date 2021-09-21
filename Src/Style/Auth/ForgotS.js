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
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 70,
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
  Title: {
    color: '#f4f4f4',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  subTitle: {
    color: '#a9a9a9',
    textAlign: 'justify',
    marginBottom: 20,
  },
  bottom: {
    color: '#a9a9a9',
    alignSelf: 'center',
    fontSize: 12,
  },
  login: {
    color: '#f4f4f4',
  },
});
