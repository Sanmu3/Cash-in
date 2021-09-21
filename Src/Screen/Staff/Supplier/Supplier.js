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
import {styles} from '../../../Style/Staff/Supplier/SupplierS';
import AsyncStorage from '@react-native-community/async-storage';

export default class Supplier extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      supp: [],
      modal: false,
      modal2: false,
      supplier: '',
      alamat: '',
      nomor_telepon: '',
      selectedId: '',
    };
  }

  addsupplier() {
    const {alamat, supplier, nomor_telepon} = this.state;
    axios({
      url: 'https://pos-project3.herokuapp.com/api/staf/supplier',
      method: 'POST',
      data: {
        alamat: alamat,
        supplier: supplier,
        nomor_telepon: nomor_telepon,
      },
      headers: {
        Authorization: `Bearer ${this.state.token} `,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({modal: false});
        this.getSupplier();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  delete(id) {
    axios({
      url: `https://pos-project3.herokuapp.com/api/staf/supplier/${id}/delete`,
      method: 'POST',
      data: {
        _method: 'delete',
      },
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.getSupplier();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  update() {
    const {supplier, alamat, nomor_telepon} = this.state;
    axios({
      url: `https://pos-project3.herokuapp.com/api/staf/supplier/${this.state.selectedId}/update`,
      method: 'POST',
      data: {
        _method: 'patch',
        supplier: supplier,
        alamat: alamat,
        nomor_telepon: nomor_telepon,
      },
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({modal2: false});
        this.getSupplier();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  getSupplier() {
    axios({
      url: 'https://pos-project3.herokuapp.com/api/staf/suppliers',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({supp: result.data.data});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  GetToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
        this.getSupplier();
      }
    });
  }

  out() {
    this.props.navigation.replace('login'), AsyncStorage.clear();
  }

  componentDidMount() {
    this.GetToken();
  }
  showModal(visible) {
    this.setState({modal: visible});
  }
  showModal2(visible) {
    this.setState({modal2: visible});
  }
  render() {
    return (
      <View style={styles.screen}>
        <Modal
          visible={this.state.modal}
          transparent={true}
          style={styles.modal}
          animationType="slide">
          <View style={styles.m1screen}>
            <TouchableOpacity
              onPress={() => this.setState({modal: false})}
              style={styles.m1close}>
              <Text style={{color: '#A9A9A9'}}>X</Text>
            </TouchableOpacity>
            <View style={styles.m1inputarea}>
              <TextInput
                placeholder="Supplier"
                style={{color: '#A9A9A9'}}
                placeholderTextColor="#A9A9A9"
                onChangeText={(supplier) => this.setState({supplier})}
              />
            </View>
            <View style={styles.m1inputarea}>
              <TextInput
                placeholder="alamat"
                style={{color: '#A9A9A9'}}
                placeholderTextColor="#A9A9A9"
                onChangeText={(alamat) => this.setState({alamat})}
              />
            </View>
            <View style={styles.m1inputarea}>
              <TextInput
                placeholder="nomor telepon"
                style={{color: '#A9A9A9'}}
                placeholderTextColor="#A9A9A9"
                keyboardType="number-pad"
                onChangeText={(nomor_telepon) => this.setState({nomor_telepon})}
              />
            </View>
            <TouchableOpacity
              style={styles.m1button}
              onPress={() => this.addsupplier()}>
              <Text style={{color: '#A9A9A9'}}> Tambah </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          visible={this.state.modal2}
          transparent={true}
          style={styles.modal}
          animationType="slide">
          <View style={styles.m1screen}>
            <TouchableOpacity
              onPress={() => this.setState({modal2: false})}
              style={styles.m1close}>
              <Text style={{color: '#A9A9A9'}}>X</Text>
            </TouchableOpacity>
            <View style={styles.m1inputarea}>
              <TextInput
                placeholder="Supplier"
                style={{color: '#A9A9A9'}}
                placeholderTextColor="#A9A9A9"
                onChangeText={(supplier) => this.setState({supplier})}
              />
            </View>
            <View style={styles.m1inputarea}>
              <TextInput
                placeholder="alamat"
                style={{color: '#A9A9A9'}}
                placeholderTextColor="#A9A9A9"
                onChangeText={(alamat) => this.setState({alamat})}
              />
            </View>
            <View style={styles.m1inputarea}>
              <TextInput
                placeholder="nomor telepon"
                style={{color: '#A9A9A9'}}
                placeholderTextColor="#A9A9A9"
                keyboardType="number-pad"
                onChangeText={(nomor_telepon) => this.setState({nomor_telepon})}
              />
            </View>
            <TouchableOpacity
              style={styles.m1button}
              onPress={() => this.update()}>
              <Text style={{color: '#A9A9A9'}}> ubah </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../../../Pic/logo.png')}
          />
          <Text style={styles.title}>Supplier</Text>
        </View>
        <ScrollView>
          {this.state.supp.map((val) => {
            return (
              <View style={styles.list}>
                <Text style={styles.listtitle}>{val.supplier}</Text>

                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.editbutton}
                    onPress={() => {
                      this.showModal2();
                      this.setState({selectedId: val.id});
                    }}>
                    <Image
                      source={require('../../../Pic/kasir/edit.png')}
                      style={styles.edit}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.editbutton}
                    onPress={() => this.delete(val.id)}>
                    <Image
                      source={require('../../../Pic/kasir/delete.png')}
                      style={styles.edit}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity style={styles.plus} onPress={() => this.showModal()}>
          <Text style={styles.plust}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
