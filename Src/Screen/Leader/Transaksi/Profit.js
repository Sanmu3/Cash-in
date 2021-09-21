import axios from 'axios';
import React, {Component} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {styles} from '../../../Style/Staff/barang/StuffS';
import AsyncStorage from '@react-native-community/async-storage';

export default class Profit extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      src: {},
    };
  }

  get() {
    axios({
      url: 'https://pos-project3.herokuapp.com/api/leader/get-profit',
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
          <Text style={styles.title}>Profit</Text>
        </View>
        {this.state.src.length == [] ? (
          <Text
            style={{
              fontSize: 26,
              alignSelf: 'center',
              marginTop: 50,
              fontWeight: 'bold',
            }}>
            Belum ada Data
          </Text>
        ) : (
          <ScrollView>
            <View
              style={{
                alignSelf: 'center',
                margin: 20,
                backgroundColor: '#373636',
                width: 250,
                alignItems: 'center',
                height: 75,
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <Text
                style={{fontSize: 24, fontWeight: 'bold', color: '#a9a9a9'}}>
                Laporan Bulanan
              </Text>
            </View>
            <View style={styles.list}>
              <View>
                <Text style={[styles.listtitle]}>
                  Debit : {this.state.src.debit}
                </Text>
                <Text style={styles.listtitle}>
                  Credit : {this.state.src.credit}
                </Text>
                <Text style={styles.listtitle}>
                  Saldo : {this.state.src.saldo}
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
