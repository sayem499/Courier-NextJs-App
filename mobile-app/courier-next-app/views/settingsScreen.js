import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutDeliveryManMutation } from '../redux/deliveryMan/deliveryManApiSlice';
import { logoutDeliveryMan } from '../redux/deliveryMan/deliveryManSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({navigation}) => {

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
    <View style={styles.settingsScreen_container}>
        <View style={styles.settings_InnerContianer}>
          <View style={styles.settingsMenu_Container}>
            <Text>SettingsScreen</Text>
          </View>
          <View style={styles.logout_Button_Container}>
            <Pressable style={styles.logout_Button}>
              <Text onPress={()=>logOut(navigation)} style={styles.logout_Text}>Logout</Text>
            </Pressable>  
          </View>  
        </View>
        
    </View>
  )
}  

const styles = StyleSheet.create({
    settingsScreen_container: {
      flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e1e3e3',
    },

    settings_InnerContianer: {
       height: '75%', width: '90%', backgroundColor: 'white', borderRadius: 10, padding: '10%',
    },
    
    logout_Button: {
      height: 50, width: '70%', borderRadius: 5, backgroundColor: '#cc2b2b', alignItems: 'center', justifyContent: 'center',
    },

    logout_Text: {
      color: 'white', fontSize: 18,
    },

    logout_Button_Container: {
      flex: 1, alignItems: 'center',
    },

    settingsMenu_Container: {
      flex: 5,
    }
})

export default SettingsScreen;