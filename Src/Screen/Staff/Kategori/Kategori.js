import axios from 'axios';
import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import {styles} from '../../../Style/Staff/Kategori/KategoriS';
import AsyncStorage from '@react-native-community/async-storage';

export default class Kategori extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      src: [],
      kategori: '',
      modal: false,
      modal2: false,
      selectedId: '',
    };
  }
  TambahKategori() {
    axios({
      url: 'https://pos-project3.herokuapp.com/api/staf/category',
      method: 'POST',
      data: {
        kategori: this.state.kategori,
      },
      headers: {
        Authorization: `Bearer ${this.state.token} `,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({modal: false});
        this.getKategori();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  delete(id) {
    axios({
      url: `https://pos-project3.herokuapp.com/api/staf/category/${id}/delete`,
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
        this.getKategori();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  update() {
    const {kategori} = this.state;
    axios({
      url: `https://pos-project3.herokuapp.com/api/staf/category/${this.state.selectedId}/update`,
      method: 'POST',
      data: {
        _method: 'patch',
        kategori: kategori,
      },
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({modal2: false});
        this.getKategori();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  GetToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
        this.getKategori();
      }
    });
  }

  out() {
    this.props.navigation.replace('login'), AsyncStorage.clear();
  }

  componentDidMount() {
    this.GetToken();
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
        this.setState({src: result.data.data});
      })
      .catch((err) => {
        console.error(err);
      });
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
                placeholder="Katergori"
                style={{color: '#A9A9A9'}}
                placeholderTextColor="#A9A9A9"
                onChangeText={(kategori) => this.setState({kategori})}
              />
            </View>
            <TouchableOpacity
              style={styles.m1button}
              onPress={() => this.TambahKategori()}>
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
                placeholder="Katergori"
                style={{color: '#A9A9A9'}}
                placeholderTextColor="#A9A9A9"
                onChangeText={(kategori) => this.setState({kategori})}
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
          <Text style={styles.title}>Kategori</Text>
        </View>
        <ScrollView>
          {this.state.src.map((val) => {
            return (
              <View style={styles.list}>
                <TouchableOpacity>
                  <Text style={styles.listtitle}>{val.kategori}</Text>
                </TouchableOpacity>
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
