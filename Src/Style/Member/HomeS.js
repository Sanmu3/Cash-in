import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    // backgroundColor: '#FF8D27',
    // justifyContent: 'center',
  },
  header: {
    backgroundColor: '#373636',
    width: 250,
    borderBottomEndRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    margin: 5,
  },
  logOut: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    margin: 5,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginLeft: 30,
  },
  Headmain: {
    backgroundColor: '#373636',
    alignSelf: 'center',
    width: 350,
    height: 50,
    borderBottomStartRadius: 50,
    borderTopEndRadius: 50,
    justifyContent: 'center',
  },
  main: {
    backgroundColor: '#FF8D27',
    alignSelf: 'center',
    marginTop: '30%',
    width: 350,
    height: 200,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  name: {
    fontSize: 20,
    color: '#a9a9a9',
    marginLeft: 50,
    fontWeight: 'bold',
  },
  data: {
    marginLeft: 50,
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  datakode: {
    marginRight: 20,
    marginTop: 50,
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  saldo: {
    backgroundColor: '#FF8D27',
    alignSelf: 'center',
    marginTop: '30%',
    width: 350,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  saldoteks: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
