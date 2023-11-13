import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLoginDeliveryManMutation } from "../redux/deliveryMan/deliveryManApiSlice";
import { setDeliveryMan } from '../redux/deliveryMan/deliveryManSlice';


const LoginScreen = () => {
  const { deliveryMan } = useSelector(state => state.deliveryManState);
  const [deliveryMan_phonenumber, setDeliveryMan_Phonenumber] = useState('');
  const [deliveryMan_password, setDeliveryMan_Password] = useState('');
  const [loginDeliveryManMutation] = useLoginDeliveryManMutation();
  const dispatch = useDispatch();

  const loginDeliveryMan = async () => {
    try {
      const res = await loginDeliveryManMutation({ deliveryMan_phonenumber, deliveryMan_password }).unwrap();
      dispatch(setDeliveryMan( res ));
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }
  /* 
    useEffect(()=> {
      console.log(deliveryMan); 
    },[]) */
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.login_Container}>
      <Text style={styles.loginText}>Login</Text>
      <TextInput style={styles.textInput} placeholder='Phonenumber' value={deliveryMan_phonenumber} onChangeText={setDeliveryMan_Phonenumber} />
      <TextInput style={styles.textInput} placeholder='Password' secureTextEntry={true} value={deliveryMan_password} onChangeText={setDeliveryMan_Password} />
      <Pressable style={styles.loginButton} onPress={loginDeliveryMan}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  login_Container: {
    flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
  },

  loginText: {
    fontSize: 30,
  },

  textInput: {
    height: 50, width: 300, borderWidth: 1, margin: 12, borderRadius: 10, padding: 10,
  },

  loginButton: {
    width: 150, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1281ff',
  },

  loginButtonText: {
    color: 'white'
  },
});

export default LoginScreen