import React, {Component} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {styles} from '../../Style/Auth/LoginS';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      CheckBox: false,
      secure: true,
      token: '',
    };
  }

  Async() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        AsyncStorage.getItem('role').then((role) => {
          if (role == 1) {
            console.log('Member');
            this.props.navigation.replace('Member');
          }
          if (role == 2) {
            this.props.navigation.replace('Kasir', {screen: 'homek'});
            console.log('Kasir');
          }
          if (role == 3) {
            this.props.navigation.replace('Staff', {screen: 'HomeS'});
            console.log('Staff');
          }
          if (role == 4) {
            this.props.navigation.replace('Leader', {screen: 'HomeL'});
            console.log('Leader');
          }
        });
      }
    });
  }

  componentDidMount() {
    this.Async();
  }

  login = () => {
    axios({
      url: 'https://pos-project3.herokuapp.com/api/login',
      method: 'POST',
      data: {
        email: this.state.email,
        password: this.state.password,
      },
    })
      .then((result) => {
        console.log(result.data);
        const {token} = result.data;
        const {role} = result.data;
        this.setState({token: token});
        AsyncStorage.setItem('token', token);

        console.log('Remember me', this.state.CheckBox);
        if (token && role == 1) {
          this.props.navigation.replace('Member', {token: this.state.token});
          if (this.state.CheckBox == true) {
            // AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('role', role.toString());
          }
        }
        if (token && role == 2) {
          this.props.navigation.replace('Kasir', {screen: 'homek'});
          if (this.state.CheckBox == true) {
            // AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('role', role.toString());
          }
        }
        if (token && role == 3) {
          this.props.navigation.replace('Staff', {screen: 'HomeS'});
          if (this.state.CheckBox == true) {
            // AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('role', role.toString());
          }
        }
        if (token && role == 4) {
          this.props.navigation.replace('Leader', {screen: 'HomeL'});
          if (this.state.CheckBox == true) {
            // AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('role', role.toString());
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.box}>
          <View style={styles.boxItem}>
            <View style={styles.inputArea}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#A9A9A9"
                style={{color: '#A9A9A9'}}
                onChangeText={(email) => this.setState({email})}
              />
            </View>
            <View style={styles.PassInputArea}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#A9A9A9"
                style={{color: '#A9A9A9', maxWidth: '80%'}}
                onChangeText={(password) => this.setState({password})}
                secureTextEntry={this.state.secure}
              />
              <TouchableOpacity
                onPress={() => this.setState({secure: !this.state.secure})}>
                <Image
                  style={styles.visible}
                  source={
                    this.state.secure == true
                      ? require('../../Pic/main/invisibility.png')
                      : require('../../Pic/main/visibility.png')
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
              <View style={styles.rememberMe}>
                <CheckBox
                  disabled={false}
                  value={this.state.CheckBox}
                  onValueChange={(CheckBox) => this.setState({CheckBox})}
                  tintColors="#4E4D4D"
                />
                <Text style={styles.BottomText}>Remember me</Text>
              </View>
              <Text
                onPress={() => this.props.navigation.navigate('LP')}
                style={styles.BottomText}>
                Forgot password
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.login()}
              style={styles.button}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </View>
          <Image style={styles.logo} source={require('../../Pic/logo.png')} />
        </View>
      </View>
    );
  }
}
