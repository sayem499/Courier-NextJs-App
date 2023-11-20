import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLoginDeliveryManMutation } from "../redux/deliveryMan/deliveryManApiSlice";
import { setDeliveryMan } from '../redux/deliveryMan/deliveryManSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const { deliveryMan } = useSelector(state => state.deliveryManState);
  const [deliveryMan_phonenumber, setDeliveryMan_Phonenumber] = useState('');
  const [deliveryMan_password, setDeliveryMan_Password] = useState('');
  const [loginDeliveryManMutation] = useLoginDeliveryManMutation();
  const dispatch = useDispatch();

  const loginDeliveryMan = async () => {
    try {
      const res = await loginDeliveryManMutation({ deliveryMan_phonenumber, deliveryMan_password }).unwrap();
      await setStorageData(res);
      dispatch(setDeliveryMan(res));
      navigation.replace('HomeScreen');

    } catch (err) {
      console.error(err);
    }
  }

  const setStorageData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('deliveryman', jsonValue);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
  }, [])

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.login_Container}>
      <View style={styles.formBackground}>
        <Text style={styles.loginText}>Login</Text>
        <TextInput style={styles.textInput} placeholder='Phonenumber' value={deliveryMan_phonenumber} onChangeText={setDeliveryMan_Phonenumber} />
        <TextInput style={styles.textInput} placeholder='Password' secureTextEntry={true} value={deliveryMan_password} onChangeText={setDeliveryMan_Password} />
        <Pressable style={styles.loginButton} onPress={loginDeliveryMan}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  login_Container: {
    flex: 1, backgroundColor: '#e1e3e3', alignItems: 'center', justifyContent: 'center',
  },

  formBackground: {
    backgroundColor: 'white', padding: 15, elevation: 16, alignItems: 'center', shadowColor: '#171717',
    borderRadius: 8,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 10,
  },

  loginText: {
    fontSize: 30,
  },

  textInput: {
    height: 50, width: 300, borderWidth: 1, margin: 12, borderRadius: 5, padding: 10,
  },

  loginButton: {
    width: 150, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1281ff',
  },

  loginButtonText: {
    color: 'white'
  },
});

export default LoginScreen