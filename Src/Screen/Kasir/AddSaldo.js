import axios from 'axios';
import React, {Component} from 'react';
import {Text, TextInput, ToastAndroid, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from '../../Style/Kasir/AddSaldoS';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class AddSaldo extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      kode_member: '',
      input_saldo: '',
    };
  }

  GetToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
      }
    });
  }

  out() {
    this.props.navigation.replace('login'), AsyncStorage.clear();
  }

  componentDidMount() {
    this.GetToken();
  }

  inputSaldo() {
    const {kode_member, input_saldo} = this.state;
    axios({
      url: 'https://pos-project3.herokuapp.com/api/kasir/input-saldo-member',
      method: 'POST',
      data: {
        kode_member: kode_member,
        input_saldo: input_saldo,
      },
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        const {notif} = result.data;
        if (notif == 'berhasil') {
          ToastAndroid.show('Sukses Menambahkan Saldo', ToastAndroid.LONG);
        } else {
          ToastAndroid.show(
            'Gagal Menambahkan, Silahkan ulangi',
            ToastAndroid.LONG,
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.box}>
          <View style={styles.inputArea}>
            <TextInput
              style={{color: '#a9a9a9'}}
              placeholder="kode member"
              placeholderTextColor="#a9a9a9"
              onChangeText={(kode_member) => this.setState({kode_member})}
            />
          </View>
          <View style={styles.inputArea}>
            <TextInput
              style={{color: '#a9a9a9'}}
              placeholder="Saldo"
              placeholderTextColor="#a9a9a9"
              onChangeText={(input_saldo) => this.setState({input_saldo})}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.inputSaldo()}>
            <Text style={styles.buttonText}> TopUp </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
