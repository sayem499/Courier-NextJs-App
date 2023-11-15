import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useLogoutDeliveryManMutation } from '../redux/deliveryMan/deliveryManApiSlice';
import { logoutDeliveryMan } from '../redux/deliveryMan/deliveryManSlice'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({navigation}) => {
  const { deliveryMan } = useSelector(state => state.deliveryManState);
  const [logoutDeliveryManMutation] = useLogoutDeliveryManMutation();
  const dispatch = useDispatch();
  const logOut = async (navigation) => {
    try{
      await AsyncStorage.removeItem('deliveryman');
      const res = await logoutDeliveryManMutation().unwrap();
      console.log(res);
      if(res){
        dispatch(logoutDeliveryMan());
        navigation.replace('LoginScreen');
      }
      
    }catch(err){
      console.error(err);
    }
    
  } 
  return (
    <View style={styles.homescreen_container}>
        <Text>HomeScreen</Text>
        <Button title='Logout' onPress={()=>logOut(navigation)}/>
    </View>
  )
}



const styles = StyleSheet.create({
    homescreen_container: { flex: 1, justifyContent: 'center', alignItems: 'center',}
})

export default HomeScreen