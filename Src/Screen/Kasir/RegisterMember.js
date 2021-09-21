import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {styles} from '../../Style/Kasir/RegisterS';

export default class RegisterMember extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      nomor_telepon: '',
      email: '',
      password: '',
      password_confirmation: '',
      security: true,
      security2: true,
    };
  }

  Daftar() {
    const {
      name,
      nomor_telepon,
      email,
      password,
      password_confirmation,
    } = this.state;
    axios({
      url: 'https://pos-project3.herokuapp.com/api/register',
      method: 'POST',
      data: {
        name: name,
        nomor_telepon: nomor_telepon,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      },
    })
      .then((result) => {
        console.log(result.data);
        const {user} = result.data;
        if (user !== null) {
          ToastAndroid.show('Berhasil Register', ToastAndroid.LONG);
        }
      })
      .catch((err) => {
        console.log(err);
        ToastAndroid.show('Gagal, Silahkan coba lagi', ToastAndroid.LONG);
      });
  }
  render() {
    return (
      <ScrollView style={styles.Screen}>
        <Text style={styles.Title}>Daftar Member</Text>
        <View style={styles.InputArea}>
          <TextInput
            placeholder="Nama"
            onChangeText={(name) => this.setState({name})}
          />
        </View>

        <View style={styles.InputArea}>
          <TextInput
            placeholder="nomor telepon"
            onChangeText={(nomor_telepon) => this.setState({nomor_telepon})}
          />
        </View>

        <View style={styles.InputArea}>
          <TextInput
            placeholder="email"
            onChangeText={(email) => this.setState({email})}
          />
        </View>

        <View style={styles.PassInputArea}>
          <TextInput
            placeholder="password"
            onChangeText={(password) => this.setState({password})}
            secureTextEntry={this.state.security}
          />
          <TouchableOpacity
            onPress={() => this.setState({security: !this.state.security})}>
            <Image
              style={styles.visible}
              source={
                this.state.security == true
                  ? require('../../Pic/main/invisibility.png')
                  : require('../../Pic/main/visibility.png')
              }
            />
          </TouchableOpacity>
        </View>

        <View style={styles.PassInputArea}>
          <TextInput
            placeholder="konfirmasi password"
            onChangeText={(password_confirmation) =>
              this.setState({password_confirmation})
            }
            secureTextEntry={this.state.security2}
          />
          <TouchableOpacity
            onPress={() => this.setState({security2: !this.state.security2})}>
            <Image
              style={styles.visible}
              source={require('../../Pic/main/invisibility.png')}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => this.Daftar()} style={styles.button}>
          <Text>Daftar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
