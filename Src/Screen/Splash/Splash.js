import React, {Component} from 'react';
import {Text, View, Image, ActivityIndicator} from 'react-native';
import {styles} from '../../Style/Splash/SplashS';
import AsyncStorage from '@react-native-community/async-storage';
import Nav from '../Nav/Navigation';

export default class Splash extends Component {
  constructor() {
    super();
    this.state = {
      role: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        role: false,
      });
    }, 2000);
  }

  Splash = () => {
    return (
      <View style={styles.Screen}>
        <View style={styles.logo}>
          <Image source={require('../../Pic/logo1.png')} />

          <Text style={styles.cash}>Cash In</Text>
        </View>
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  };
  render() {
    if (this.state.role) {
      return <>{this.Splash()}</>;
    } else {
      return <Nav />;
    }
  }
}
