import axios from 'axios';
import React, {Component} from 'react';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {styles} from '../../../Style/Staff/barang/StuffS';
import AsyncStorage from '@react-native-community/async-storage';

export default class Penjualan extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      src: [],
    };
  }

  get() {
    axios({
      url: 'https://pos-project3.herokuapp.com/api/leader/get-trans-penjualan',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({src: result.data.data});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  GetToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
        this.get();
      }
    });
  }

  out() {
    this.props.navigation.replace('login'), AsyncStorage.clear();
  }

  componentDidMount() {
    this.GetToken();
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../../../Pic/logo.png')}
          />
          <Text style={styles.title}>Penjualan</Text>
        </View>
        {this.state.src.length == [] ? (
          <Text
            style={{
              fontSize: 26,
              alignSelf: 'center',
              marginTop: 50,
              fontWeight: 'bold',
            }}>
            Belum ada Data penjualan
          </Text>
        ) : (
          <ScrollView>
            {this.state.src.map((val) => {
              return (
                <View style={styles.list}>
                  <View>
                    <Text style={[styles.listtitle]}>Id : {val.id}</Text>
                    <Text style={styles.listtitle}>
                      barang : {val.barang[0].nama_barang}
                    </Text>
                    <Text style={styles.listtitle}>jumlah : {val.jumlah}</Text>
                    <Text style={styles.listtitle}>Harga : {val.harga}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }
}
