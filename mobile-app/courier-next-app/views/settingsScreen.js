import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutDeliveryManMutation } from '../redux/deliveryMan/deliveryManApiSlice';
import { resetDeliveryMan, setDeliveryMan } from '../redux/deliveryMan/deliveryManSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const { deliveryMan } = useSelector(state => state.deliveryManState);
  const profileImg = require('../assets/profileImg.jpg'); 
  const [logoutDeliveryManMutation] = useLogoutDeliveryManMutation();
  const dispatch = useDispatch();
  let temp;

  useEffect(() => {
    if(deliveryMan.length === 0){
      getDeliveryManData();      
    }

  }, [deliveryMan])
  
  const getDeliveryManData = async () => {
    try {
      const res = await AsyncStorage.getItem('deliveryman');
      result = JSON.parse(res);
      res && dispatch(setDeliveryMan(res));
    } catch (err) {
      console.error(err.error || err.data?.message)
    }
  }

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('deliveryman');
      const res = await logoutDeliveryManMutation().unwrap();
      console.log(res);
      if (res) {
        dispatch(resetDeliveryMan());
        navigation.replace('LoginScreen');
      }

    } catch (err) {
      console.error(err.error || err.data?.message);
    }

  }


  return (
    <View style={styles.settingsScreen_container}>
      <View style={styles.settingsTop_InnerContainer}>
        <Image source={ {uri: deliveryMan[0]?.deliveryMan_image } || profileImg} style={styles.profileImage} />
        <View style={styles.profileDetails}>
          <Text style={{fontWeight: 'bold'}}>{deliveryMan[0]?.deliveryMan_username}</Text>
          <Text>{deliveryMan[0]?.deliveryMan_email}</Text>
          <Text>{deliveryMan[0]?.deliveryMan_phonenumber}</Text>
        </View>


      </View>
      <View style={styles.settingsBottom_InnerContianer}>
        <View style={styles.settingsMenu_Container}>
          <Text>SettingsScreen</Text>
        </View>
        <View style={styles.logout_Button_Container}>
          <Pressable style={styles.logout_Button} onPress={logOut}>
            <Text style={styles.logout_Text}>Logout</Text>
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

  settingsTop_InnerContainer: {
    height: '10%', width: '90%', backgroundColor: 'white', borderRadius: 10, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center',
  },

  profileImage: {
    width: '20%', height: '85%', borderRadius: 50, marginLeft: 20,
  },

  profileDetails: {
    justifyContent: 'center', alignItems: 'flex-start', width: '80%', height: '90%', marginLeft: 30,
  },

  settingsBottom_InnerContianer: {
    height: '70%', width: '90%', backgroundColor: 'white', borderRadius: 10, padding: '10%', marginBottom: 30,
  },

  logout_Button: {
    height: 50, width: '70%', borderRadius: 5, backgroundColor: '#cc2b2b', alignItems: 'center', justifyContent: 'center',
  },

  logout_Text: {
    color: 'white', fontSize: 18,
  },

  logout_Button_Container: {
    alignItems: 'center',
  },

  settingsMenu_Container: {

  }
})

export default SettingsScreen;