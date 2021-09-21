import React, {Component} from 'react';
import {
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import {styles} from '../../Style/Auth/ForgotS';
import CheckBox from '@react-native-community/checkbox';

export default class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',

      CheckBox: false,
    };
  }

  PP() {
    axios({
      url: 'https://pos-project3.herokuapp.com/api/password/email',
      method: 'POST',
      data: {
        email: this.state.email,
      },
    })
      .then((result) => {
        console.log(result.data);
        if (result.data.code == 500) {
          ToastAndroid.show('Yang anda masukan bukan email', ToastAndroid.LONG);
        } else {
          ToastAndroid.show('Check Gmail anda', ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.box}>
          <View style={styles.boxItem}>
            <Text style={styles.Title}>Lupa Password Anda?</Text>
            <Text style={styles.subTitle}>
              Silakan isi email yang Anda gunakan untuk mendaftar. Anda akan
              dikirimi email dengan instruksi tentang cara mengatur ulang kata
              sandi Anda
            </Text>
            <View style={styles.inputArea}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#A9A9A9"
                style={{color: '#A9A9A9'}}
                onChangeText={(email) => this.setState({email})}
              />
            </View>

            <TouchableOpacity onPress={() => this.PP()} style={styles.button}>
              <Text style={styles.buttonText}>Send email</Text>
            </TouchableOpacity>
            <Text style={styles.bottom}>
              Remember your password?{' '}
              <Text
                onPress={() => this.props.navigation.navigate('login')}
                style={styles.login}>
                Log In
              </Text>
            </Text>
          </View>
          <Image style={styles.logo} source={require('../../Pic/logo.png')} />
        </View>
      </View>
    );
  }
}
