import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {styles} from '../../Style/Member/HomeS';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      user: {},
      saldo: '',
    };
  }

  GetToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
        this.GetProfile();
        this.getSaldo();
      }
    });
  }

  out() {
    this.props.navigation.replace('login'), AsyncStorage.clear();
  }
  GetProfile() {
    axios({
      url: 'https://pos-project3.herokuapp.com/api/user',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({user: result.data.user});
      })
      .catch((err) => console.error(err));
  }
  getSaldo() {
    axios({
      url: 'https://pos-project3.herokuapp.com/api/member',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((result) => {
        console.log('saldo', result.data);
        this.setState({saldo: result.data.saldo});
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.GetToken();
  }
  render() {
    var data = this.state.user;
    return (
      <View style={styles.Screen}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.header}>
            <Image style={styles.logo} source={require('../../Pic/logo.png')} />
            <Text style={styles.title}>Member</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.out()}
            style={{marginRight: 10}}>
            <Image
              style={styles.logOut}
              source={require('../../Pic/logout.png')}
            />
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.main}>
          <View style={styles.Headmain}>
            <Text style={styles.name}>Hi, {data.name} </Text>
          </View>
          <Text style={styles.data}>Email : {data.email}</Text>
          <Text style={styles.data}>Nomor Telepon : {data.nomor_telepon}</Text>
          <Text style={styles.datakode}>{data.kode_member}</Text>
        </View>
        <View style={styles.saldo}>
          <Text style={styles.saldoteks}>
            Saldo Anda : Rp. {this.state.saldo}
          </Text>
        </View>
      </View>
    );
  }
}
