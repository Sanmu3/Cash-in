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
import {Picker} from '@react-native-picker/picker';
import {get} from 'react-native/Libraries/Utilities/PixelRatio';

export default class Stuff extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      src: [],
      modal: false,
      modal2: false,
      supplier_id: '',
      nama_barang: '',
      kategori_id: '',
      harga_beli: '',
      harga_jual: '',
      selectedId: '',
      gkategori: [],
      gsupp: [],
    };
  }

  add() {
    const {
      nama_barang,
      supplier_id,
      kategori_id,
      harga_beli,
      harga_jual,
    } = this.state;
    axios({
      url: 'https://pos-project3.herokuapp.com/api/staf/goods',
      method: 'POST',
      data: {
        nama_barang: nama_barang,
        supplier_id: supplier_id,
        kategori_id: kategori_id,
        harga_beli: harga_beli,
        harga_jual: harga_jual,
      },
      headers: {
        Authorization: `Bearer ${this.state.token} `,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({modal: false, kategori_id: '0', supplier_id: '0'});
        this.get();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  delete(id) {
    axios({
      url: `https://pos-project3.herokuapp.com/api/staf/goods/${id}/delete`,
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
  update() {
    const {
      nama_barang,
      supplier_id,
      kategori_id,
      harga_beli,
      harga_jual,
    } = this.state;
    axios({
      url: `https://pos-project3.herokuapp.com/api/staf/goods/${this.state.selectedId}/update`,
      method: 'POST',
      data: {
        _method: 'patch',
        nama_barang: nama_barang,
        supplier_id: supplier_id,
        kategori_id: kategori_id,
        harga_beli: harga_beli,
        harga_jual: harga_jual,
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
  get() {
    axios({
      url: 'https://pos-project3.herokuapp.com/api/staf/goods',
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
        this.getKategori();
        this.getSupplier();
      }
    });
  }

  out() {
    this.props.navigation.replace('login'), AsyncStorage.clear();
  }
  getKategori() {
    axios({
      url: 'https://pos-project3.herokuapp.com/api/staf/categories',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token} `,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({gkategori: result.data.data});
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
        this.setState({gsupp: result.data.data});
      })
      .catch((err) => {
        console.error(err);
      });
  }
  componentDidMount() {
    this.GetToken();
  }
  showModal(visible) {
    this.setState({modal: visible});
    this.getKategori();
  }
  showModal2(visible) {
    this.setState({modal2: visible});
  }

  render() {
    console.log('ini', this.state.gsupp);
    return (
      <View style={styles.screen}>
        <Modal
          visible={this.state.modal}
          transparent={true}
          style={styles.modal}
          animationType="slide">
          <View style={styles.m1screen}>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  modal: false,
                  kategori_id: '0',
                  supplier_id: '0',
                })
              }
              style={styles.m1close}>
              <Text style={{color: '#A9A9A9'}}>X</Text>
            </TouchableOpacity>

            <View style={styles.two}>
              <View style={styles.m1inputarea2}>
                <Picker
                  selectedValue={this.state.kategori_id}
                  style={{color: '#a9a9a9'}}
                  onValueChange={(itemValue) =>
                    itemValue === '0'
                      ? null
                      : this.setState({kategori_id: itemValue})
                  }>
                  <Picker.Item value="0" label="Kategori" color="gray" />
                  {this.state.gkategori.map((val) => {
                    return (
                      <Picker.Item
                        value={val.id}
                        label={val.kategori}
                        color="black"
                      />
                    );
                  })}
                </Picker>
              </View>
              <View style={styles.m1inputarea2}>
                <Picker
                  selectedValue={this.state.supplier_id}
                  style={{color: '#a9a9a9'}}
                  onValueChange={(itemValue) =>
                    itemValue === '0'
                      ? null
                      : this.setState({supplier_id: itemValue})
                  }>
                  <Picker.Item value="0" label="Supplier" color="gray" />
                  {this.state.gsupp.map((val) => {
                    return (
                      <Picker.Item
                        value={val.id}
                        label={val.supplier}
                        color="black"
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View style={styles.m1inputarea}>
              <TextInput
                placeholder="nama barang"
                style={{color: '#A9A9A9'}}
                placeholderTextColor="#A9A9A9"
                onChangeText={(nama_barang) => this.setState({nama_barang})}
              />
            </View>

            <View style={styles.two}>
              <View style={styles.m1inputarea2}>
                <TextInput
                  placeholder="Harga Beli"
                  style={{color: '#A9A9A9'}}
                  placeholderTextColor="#A9A9A9"
                  keyboardType="number-pad"
                  onChangeText={(harga_beli) => this.setState({harga_beli})}
                />
              </View>
              <View style={styles.m1inputarea2}>
                <TextInput
                  placeholder="Harga Jual"
                  style={{color: '#A9A9A9'}}
                  placeholderTextColor="#A9A9A9"
                  keyboardType="number-pad"
                  onChangeText={(harga_jual) => this.setState({harga_jual})}
                />
              </View>
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
          style={styles.modal}
          animationType="slide">
          <View style={styles.m1screen}>
            <TouchableOpacity
              onPress={() => this.setState({modal2: false})}
              style={styles.m1close}>
              <Text style={{color: '#A9A9A9'}}>X</Text>
            </TouchableOpacity>
            <View style={styles.two}>
              <View style={styles.m1inputarea2}>
                <Picker
                  selectedValue={this.state.kategori_id}
                  style={{color: '#a9a9a9'}}
                  onValueChange={(itemValue) =>
                    itemValue === '0'
                      ? null
                      : this.setState({kategori_id: itemValue})
                  }>
                  <Picker.Item value="0" label="Kategori" color="gray" />
                  {this.state.gkategori.map((val) => {
                    return (
                      <Picker.Item
                        value={val.id}
                        label={val.kategori}
                        color="black"
                      />
                    );
                  })}
                </Picker>
              </View>
              <View style={styles.m1inputarea2}>
                <Picker
                  selectedValue={this.state.supplier_id}
                  style={{color: '#a9a9a9'}}
                  onValueChange={(itemValue) =>
                    itemValue === '0'
                      ? null
                      : this.setState({supplier_id: itemValue})
                  }>
                  <Picker.Item value="0" label="Supplier" color="gray" />
                  {this.state.gsupp.map((val) => {
                    return (
                      <Picker.Item
                        value={val.id}
                        label={val.supplier}
                        color="black"
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View style={styles.m1inputarea}>
              <TextInput
                placeholder="nama barang"
                style={{color: '#A9A9A9'}}
                placeholderTextColor="#A9A9A9"
                onChangeText={(nama_barang) => this.setState({nama_barang})}
              />
            </View>

            <View style={styles.two}>
              <View style={styles.m1inputarea2}>
                <TextInput
                  placeholder="Harga Beli"
                  style={{color: '#A9A9A9'}}
                  placeholderTextColor="#A9A9A9"
                  keyboardType="number-pad"
                  onChangeText={(harga_beli) => this.setState({harga_beli})}
                />
              </View>
              <View style={styles.m1inputarea2}>
                <TextInput
                  placeholder="Harga Jual"
                  style={{color: '#A9A9A9'}}
                  placeholderTextColor="#A9A9A9"
                  keyboardType="number-pad"
                  onChangeText={(harga_jual) => this.setState({harga_jual})}
                />
              </View>
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
          <Text style={styles.title}>Barang</Text>
        </View>
        <ScrollView>
          {this.state.src.map((val) => {
            return (
              <View style={styles.list}>
                <View>
                  <Text style={[styles.listtitle]}>Id : {val.id}</Text>
                  <Text style={styles.listtitle}>Item : {val.nama_barang}</Text>
                  <Text style={styles.listtitle}>
                    Harga Beli : {val.harga_beli}
                  </Text>
                  <Text style={styles.listtitle}>
                    Harga Jual : {val.harga_jual}
                  </Text>
                </View>
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
