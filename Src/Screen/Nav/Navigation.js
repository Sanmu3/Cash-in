import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Kategori from '../Staff/Kategori/Kategori';
import Supplier from '../Staff/Supplier/Supplier';
import Login from '../Auth/Login';
import ForgotPassword from '../Auth/ForgotPassword';
import RegisterMember from '../Kasir/RegisterMember';
import Home from '../Member/Home';
import HomeK from '../Kasir/HomeK';
import AddSaldo from '../Kasir/AddSaldo';
import Sell from '../Kasir/Sell';
import Stuff from '../Staff/Barang/Stuff';
import Order from '../Staff/Order/Order';
import Histori from '../Staff/History/Histori';
import HomeS from '../Staff/StaffHome';
import HomeL from '../Leader/LeaderHome';
import Pembelian from '../Leader/Transaksi/Pembelian';
import Penjualan from '../Leader/Transaksi/Penjualan';
import All from '../Leader/Transaksi/All';
import Profit from '../Leader/Transaksi/Profit';

const Stack = createStackNavigator();
const Bottom = createBottomTabNavigator();

const Leader = () => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen name="Profit" component={Profit} />
      <Bottom.Screen name="Pembelian" component={Pembelian} />
      <Bottom.Screen name="HomeL" component={HomeL} options={{title: 'Home'}} />
      <Bottom.Screen name="Penjualan" component={Penjualan} />
      <Bottom.Screen name="Semua" component={All} />
    </Bottom.Navigator>
  );
};

const Kasir = () => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen name="Reg" component={RegisterMember} />
      <Bottom.Screen name="homek" component={HomeK} options={{title: 'Home'}} />
      <Bottom.Screen name="TopUp" component={AddSaldo} />
      <Bottom.Screen name="sell" component={Sell} />
    </Bottom.Navigator>
  );
};

const Staff = () => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen name="Kategori" component={Kategori} />
      <Bottom.Screen name="Supplier" component={Supplier} />
      <Bottom.Screen name="Stuff" component={Stuff} />
      <Bottom.Screen name="HomeS" component={HomeS} options={{title: 'Home'}} />

      <Bottom.Screen name="Order" component={Order} />
      <Bottom.Screen name="Histori" component={Histori} />
    </Bottom.Navigator>
  );
};

const Nav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LP"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Member"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Kasir"
          component={Kasir}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Staff"
          component={Staff}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Leader"
          component={Leader}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Nav;
