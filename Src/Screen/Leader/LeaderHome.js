import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {styles} from '../../Style/Kasir/HomeKS';
import AsyncStorage from '@react-native-community/async-storage';

export default class HomeL extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      user: {},
    };
  }

  GetToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
        this.GetProfile();
      } else {
        this.out();
      }
    });
  }

  out() {
    this.props.navigation.replace('login'), AsyncStorage.clear();
  }

  componentDidMount() {
    this.GetToken();
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
        console.log(result.data), this.setState({user: result.data.user});
      })
      .catch((err) => console.error(err));
  }

  render() {
    var data = this.state.user;
    return (
      <View style={styles.Screen}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.header}>
            <Image style={styles.logo} source={require('../../Pic/logo.png')} />
            <Text style={styles.title}>Leader</Text>
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
        </View>
        <Text style={styles.data}>{data.kode_member}</Text>
      </View>
    );
  }
}
