import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutDeliveryManMutation } from '../redux/deliveryMan/deliveryManApiSlice';
import { resetDeliveryMan, setDeliveryMan } from '../redux/deliveryMan/deliveryManSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';
import { setThemeState } from '../redux/theme/themeSlice';
import { Appearance } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const { appTheme } = useSelector(state => state.themeState);
  const systemTheme = Appearance.getColorScheme();
  const { deliveryMan } = useSelector(state => state.deliveryManState);
  const profileImg = require('../assets/profileImg.jpg');
  const [logoutDeliveryManMutation] = useLogoutDeliveryManMutation();
  const [radioValue, setRadioValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (deliveryMan.length === 0) {
      getDeliveryManData();
    }
    getThemeData();

  }, [deliveryMan])

  Appearance.addChangeListener(async (theme) => {
    let val = await AsyncStorage.getItem('theme');
    if (val === 'system') {
      dispatch(setThemeState(theme));
    }
  })

  const getThemeData = async () => {
    try {
      const val = await AsyncStorage.getItem('theme');
      if (val === 'dark' || val === 'light')
        dispatch(setThemeState(val));
      else
        dispatch(setThemeState(systemTheme));
      setRadioValue(val);
    } catch (err) {
      console.error(err.error);
    }
  }

  const setThemeData = async (data) => {
    try {
      await AsyncStorage.setItem('theme', data);
      setRadioValue(data);
      if (data === 'dark' || data === 'light')
        dispatch(setThemeState(data));
      else
        dispatch(setThemeState(systemTheme));
    } catch (err) {
      console.error(err.error);
    }
  }

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
    <View style={[styles.settingsScreen_container, appTheme === 'dark' ? styles.bgColorDark1 : styles.bgColorLight1]}>
      <View style={[styles.settingsTop_InnerContainer, appTheme === 'dark' ? styles.bgColorDark2 : styles.bgColorLight2]}>
        <Image source={{ uri: deliveryMan[0]?.deliveryMan_image } || profileImg} style={styles.profileImage} />
        <View style={styles.profileDetails}>
          <Text style={[{ fontWeight: 'bold' }, appTheme === 'dark' ? styles.textColorDark : styles.textColorLight]}>{deliveryMan[0]?.deliveryMan_username}</Text>
          <Text style={[appTheme === 'dark' ? styles.textColorDark : styles.textColorLight]}>{deliveryMan[0]?.deliveryMan_email}</Text>
          <Text style={[appTheme === 'dark' ? styles.textColorDark : styles.textColorLight]}>{deliveryMan[0]?.deliveryMan_phonenumber}</Text>
        </View>


      </View>
      <View style={[styles.settingsBottom_InnerContianer, appTheme === 'dark' ? styles.bgColorDark2 : styles.bgColorLight2 ]}>
        <View style={[styles.settingsMenu_Container, appTheme === 'dark' ? styles.bgColorDark2 : styles.bgColorLight2 ]}>
          <View style={styles.themeMode}>
            <Text style={[appTheme === 'dark' ? styles.textColorDark : styles.textColorLight]}>Theme</Text>
            <View style={styles.radioGroup}>
              <View style={styles.radioButtonGroup}>
                <Text style={[appTheme === 'dark' ? styles.textColorDark : styles.textColorLight]}>Dark</Text>
                <RadioButton.Android
                  style={styles.radioButton}
                  value='dark'
                  onPress={() => setThemeData('dark')}
                  status={radioValue === 'dark' ? 'checked' : 'unchecked'}
                  color="#007BFF"
                  uncheckedColor={appTheme === 'dark' ? 'white': 'black'} />
              </View>
              <View style={styles.radioButtonGroup}>
                <Text style={[appTheme === 'dark' ? styles.textColorDark : styles.textColorLight]}>Light</Text>
                <RadioButton.Android
                  style={styles.radioButton}
                  value='light'
                  onPress={() => setThemeData('light')}
                  status={radioValue === 'light' ? 'checked' : 'unchecked'}
                  color="#007BFF"
                  uncheckedColor={appTheme === 'dark' ? 'white': 'black'} />
              </View>
              <View style={styles.radioButtonGroup}>
                <Text style={[appTheme === 'dark' ? styles.textColorDark : styles.textColorLight]}>System</Text>
                <RadioButton.Android
                  style={styles.radioButton}
                  value='system'
                  onPress={() => setThemeData('system')}
                  status={radioValue === 'system' ? 'checked' : 'unchecked'}
                  color="#007BFF"
                  uncheckedColor={appTheme === 'dark' ? 'white': 'black'} />
              </View>
            </View>
          </View>
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
    height: '70%', width: '90%', backgroundColor: 'white', borderRadius: 10, paddingTop: '10%',
    paddingLeft: '3%', paddingRight: '3%', marginBottom: 30,
  },

  logout_Button: {
    height: '100%', width: '70%', borderRadius: 5, backgroundColor: '#cc2b2b',
    alignItems: 'center', justifyContent: 'center',
  },

  logout_Text: {
    color: 'white', fontSize: 18,
  },

  logout_Button_Container: {
    alignItems: 'center', height: '10%', width: '100%', justifyContent: 'center',
  },

  settingsMenu_Container: {
    justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: '85%',
  },

  themeMode: {
    width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    borderRadius: 2, borderColor: 'black', height: '15%', borderBottomWidth: 0.2,
  },

  radioGroup: {
    flexDirection: 'row', width: '50%', alignItems: 'center', justifyContent: 'center',
    height: '100%', marginLeft: 70,

  },

  radioButtonGroup: {
    justifyContent: 'center', alignitems: 'center', marginLeft: 20,
  },

  settingsTitle: {
    fontSize: 15,
  },

  radioButton: {
  },

  radioButtonLabel: {
    fontSize: 12, color: 'gray',
  },

  bgColorDark1: {
    backgroundColor: '#020538',
  },

  bgColorLight1: {
    backgroundColor: '#e1e3e3',
  },

  bgColorDark2: {
    backgroundColor: '#263375',
  },

  bgColorLight2: {
    backgroundColor: 'white',
  },

  textColorDark: {
    color: 'white',
  },

  textColorLight: {
    color: 'black',
  },

})

export default SettingsScreen;