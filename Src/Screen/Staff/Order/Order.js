import axios from 'axios';
import React, {Component} from 'react';
import {styles} from '../../../Style/Staff/Order/OrderS';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Order extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      total: null,
      barang_id: '',
      jumlah: '',
      selectedId: '',
      item: [],
      total_uang: '',
      kode_member: '',
      modal: false,
      modal2: false,
      modal3: false,
      ptotal: [],
      pharga: '',
      struk: false,
    };
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

  pay() {
    axios({
      url: 'https://pos-project3.herokuapp.com/api/staf/pay',
      method: 'POST',
      data: {
        _method: 'patch',
      },
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({
          ptotal: result.data.data.total,
          pharga: result.data.data.harga,
          struk: true,
        });
        this.get();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  add() {
    const {barang_id, jumlah} = this.state;
    if (this.state.jumlah == '') {
      this.setState({jumlah: 1});
    }
    axios({
      url: 'https://pos-project3.herokuapp.com/api/staf/order',
      method: 'POST',
      data: {
        barang_id: barang_id,
        jumlah: jumlah,
      },
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({modal: false});
        this.get();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  update(id) {
    const {jumlah} = this.state;
    axios({
      url: `https://pos-project3.herokuapp.com/api/staf/order/${this.state.selectedId}/update`,
      method: 'POST',
      data: {
        _method: 'patch',
        jumlah: jumlah,
      },
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({modal2: false});
        this.get();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  delete(id) {
    axios({
      url: `https://pos-project3.herokuapp.com/api/staf/order/${id}/delete`,
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
        this.get();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  get() {
    axios({
      url: 'https://pos-project3.herokuapp.com/api/staf/orders',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((result) => {
        console.log(result.data),
          this.setState({
            total: result.data.data['total harga'],
            item: result.data.data.item,
          });
      })
      .catch((err) => {
        console.error('get', err);
      });
  }

  showModal(visible) {
    this.setState({modal: visible});
  }
  showModal2(visible) {
    this.setState({modal2: visible});
  }
  showModal3(visible) {
    this.setState({modal3: visible});
  }

  render() {
    console.log('ini harga', this.state.pharga, 'ini total', this.state.ptotal);
    return (
      <View style={styles.screen}>
        <Modal
          visible={this.state.struk}
          transparent={true}
          style={styles.modal}
          animationType="slide">
          <View style={styles.barangscreen}>
            <Text style={styles.barangTitle}>Transaksi Berhasil</Text>
            {this.state.ptotal.map((val) => {
              return (
                <View style={styles.barang}>
                  <Text style={styles.barangItem}>
                    {val.barang.nama_barang}
                  </Text>
                  <Text style={styles.barangItem}>{val.barang.harga_beli}</Text>
                  <Text style={styles.barangItem}>{val.jumlah}</Text>
                  <Text style={styles.barangItem}>{val.harga}</Text>
                </View>
              );
            })}
            <Text style={styles.harga}>Total : {this.state.pharga}</Text>
            <TouchableOpacity
              style={styles.m1button}
              onPress={() => this.setState({struk: false})}>
              <Text style={{color: '#A9A9A9'}}> OK </Text>
            </TouchableOpacity>
          </View>
        </Modal>

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
                placeholder="Barang Id"
                style={{color: '#A9A9A9'}}
                placeholderTextColor="#A9A9A9"
                onChangeText={(barang_id) => this.setState({barang_id})}
              />
            </View>
            <TouchableOpacity
              style={styles.m1button}
              onPress={() => this.add()}>
              <Text style={{color: '#A9A9A9'}}> Tambah </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          visible={this.state.modal2}
          transparent={true}
          animationType="slide">
          <View style={styles.m2screen}>
            <TouchableOpacity
              onPress={() => this.setState({modal2: false})}
              style={styles.m1close}>
              <Text style={{color: '#A9A9A9'}}>X</Text>
            </TouchableOpacity>
            <View style={styles.m2item}>
              <TouchableOpacity
                style={styles.count}
                onPress={() => this.setState({jumlah: this.state.jumlah + 1})}>
                <Text style={{color: '#A9A9A9'}}>+</Text>
              </TouchableOpacity>
              <Text style={styles.m2jumlah}>{this.state.jumlah}</Text>
              <TouchableOpacity
                style={styles.count}
                onPress={() =>
                  this.state.jumlah == 1
                    ? this.state.jumlah
                    : this.setState({jumlah: this.state.jumlah - 1})
                }>
                <Text style={{color: '#A9A9A9'}}>-</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                const id = this.state.selectedId;
                this.update(id);
              }}
              style={styles.m2button}>
              <Text style={{color: '#A9A9A9'}}>Update</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.tabelbarang}>
            <Text>Nama barang</Text>
          </View>
          <View style={styles.tabelhj}>
            <Text>Harga</Text>
          </View>
          <View style={styles.tabeljumlah}>
            <Text>jumlah</Text>
          </View>
          <View style={styles.tabelharga}>
            <Text>harga total</Text>
          </View>
        </View>
        <ScrollView>
          {this.state.item.map((val, key) => {
            return (
              <View style={{flexDirection: 'row'}}>
                <View style={styles.tabelbarang}>
                  <Text>{val.barang.nama_barang}</Text>
                </View>
                <View style={styles.tabelhj}>
                  <Text>{val.barang.harga_jual}</Text>
                </View>
                <View style={styles.tabeljumlah}>
                  <Text>{val.jumlah}</Text>
                </View>
                <View style={styles.tabelharga}>
                  <Text>{val.harga} </Text>
                </View>
                <TouchableOpacity
                  style={styles.editbutton}
                  onPress={() => {
                    this.showModal2();
                    this.setState({jumlah: val.jumlah});
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
            );
          })}
        </ScrollView>
        <View style={styles.total}>
          <Text style={{alignSelf: 'center'}}>
            Rp. {this.state.total == null ? '0' : this.state.total}
          </Text>
        </View>
        <View style={styles.pembayaran}>
          <TouchableOpacity style={styles.pay} onPress={() => this.pay()}>
            <Text style={styles.payt}>Bayar</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.plus} onPress={() => this.showModal()}>
          <Text style={styles.plust}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
