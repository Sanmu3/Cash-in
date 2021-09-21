import axios from 'axios';
import React, {Component} from 'react';
import {styles} from '../../Style/Kasir/SellS';
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

export default class Sell extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      total: null,
      barcode: '',
      jumlah: '',
      selectedId: '',
      item: [],
      total_uang: '',
      kode_member: '',
      modal: false,
      modal2: false,
      modal3: false,
      pitem: [],
      ptotal: '',
      pharga: '',
      kembali: '',
      struk: false,
    };
  }
  GetToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
        this.getTotal();
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
    const {total_uang} = this.state;
    axios({
      url: 'https://pos-project3.herokuapp.com/api/kasir/pay',
      method: 'POST',
      data: {
        _method: 'patch',
        total_uang: total_uang,
      },
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({
          ptotal: result.data.data.total,
          pitem: result.data.data.item,
          pharga: result.data.data.total_uang,
          kembali: result.data.data.kembali,
          struk: true,
        });
        this.getTotal();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  payMember() {
    const {kode_member} = this.state;
    axios({
      url: 'https://pos-project3.herokuapp.com/api/kasir/pay-member',
      method: 'POST',
      data: {
        _method: 'patch',
        kode_member: kode_member,
      },
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({modal3: false});
        this.getTotal();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  addstuff() {
    const {barcode, jumlah} = this.state;
    if (this.state.jumlah == '') {
      this.setState({jumlah: 1});
    }
    axios({
      url: 'https://pos-project3.herokuapp.com/api/kasir/sale',
      method: 'POST',
      data: {
        barcode: barcode,
        jumlah: jumlah,
      },
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({modal: false});
        this.getTotal();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  update(id) {
    const {jumlah} = this.state;
    axios({
      url: `https://pos-project3.herokuapp.com/api/kasir/sale/${this.state.selectedId}/update`,
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
        this.getTotal();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  delete(id) {
    axios({
      url: `https://pos-project3.herokuapp.com/api/kasir/sale/${id}/delete`,
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
        this.getTotal();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getTotal() {
    axios({
      url: 'https://pos-project3.herokuapp.com/api/kasir/sales',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((result) => {
        console.log(result.data),
          this.setState({
            total: result.data.data.total,
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
    return (
      <View style={styles.screen}>
        <Modal
          visible={this.state.struk}
          transparent={true}
          style={styles.modal}
          animationType="slide">
          <View style={styles.barangscreen}>
            <Text style={styles.barangTitle}>Transaksi Berhasil</Text>
            {this.state.pitem.map((val) => {
              return (
                <View style={styles.barang}>
                  <Text style={styles.barangItem}>
                    {val.barang[0].nama_barang}
                  </Text>
                  <Text style={styles.barangItem}>{val.barang.harga_beli}</Text>
                  <Text style={styles.barangItem}>{val.jumlah}</Text>
                  <Text style={styles.barangItem}>{val.harga}</Text>
                </View>
              );
            })}
            <Text style={styles.harga}>Harga : {this.state.ptotal}</Text>
            <Text style={styles.harga2}>Nominal : {this.state.pharga}</Text>
            <Text style={styles.harga3}>kembali : {this.state.kembali}</Text>
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
                placeholder="Code"
                style={{color: '#A9A9A9'}}
                placeholderTextColor="#A9A9A9"
                onChangeText={(barcode) => this.setState({barcode})}
              />
            </View>
            <TouchableOpacity
              style={styles.m1button}
              onPress={() => this.addstuff()}>
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

        <Modal
          visible={this.state.modal3}
          transparent={true}
          style={styles.modal}
          animationType="slide">
          <View style={styles.m3screen}>
            <TouchableOpacity
              onPress={() => this.setState({modal3: false})}
              style={styles.m3close}>
              <Text style={{color: '#A9A9A9'}}>X</Text>
            </TouchableOpacity>
            <View style={styles.m3inputarea}>
              <TextInput
                placeholder="Kode member"
                style={{color: '#A9A9A9'}}
                placeholderTextColor="#A9A9A9"
                onChangeText={(kode_member) => this.setState({kode_member})}
              />
            </View>
            <TouchableOpacity
              style={styles.m3button}
              onPress={() => this.payMember()}>
              <Text style={{color: '#A9A9A9'}}> Bayar </Text>
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
                  <Text>{val.barang[0].nama_barang}</Text>
                </View>
                <View style={styles.tabelhj}>
                  <Text>{val.barang[0].harga_jual}</Text>
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
                    source={require('../../Pic/kasir/edit.png')}
                    style={styles.edit}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editbutton}
                  onPress={() => this.delete(val.id)}>
                  <Image
                    source={require('../../Pic/kasir/delete.png')}
                    style={styles.edit}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.uang}>
          <View style={styles.inputuang}>
            <TextInput
              placeholder="nominal"
              onChangeText={(total_uang) =>
                this.setState({total_uang: total_uang})
              }
            />
          </View>
          <View style={styles.total}>
            <Text style={{alignSelf: 'center'}}>
              Rp. {this.state.total == null ? '0' : this.state.total}
            </Text>
          </View>
        </View>
        <View style={styles.pembayaran}>
          <TouchableOpacity style={styles.pay} onPress={() => this.pay()}>
            <Text style={styles.payt}>Bayar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pay}
            onPress={() => this.showModal3()}>
            <Text style={styles.payt}>Member</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.plus} onPress={() => this.showModal()}>
          <Text style={styles.plust}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
