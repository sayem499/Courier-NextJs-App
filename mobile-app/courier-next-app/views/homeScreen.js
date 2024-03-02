import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const logoImg = require('../assets/fast-delivery-truck.png');
const logoImgDark = require('../assets/fast-delivery-truck-dark.png');



const HomeScreen = ({navigation}) => {

  const {appTheme} = useSelector(state => state.themeState);


  useEffect(()=> {
  },[])

  const openPicked = () => {
    navigation.push('PickedParcelScreen');
  }

  const openDelivered = () => {
    navigation.push('DeliveredParcelScreen');
  }

  return (
    <View style={[styles.homescreen_container, appTheme === 'dark' ? styles.bgColorDark1 : styles.bgColorLight1]}>
      <StatusBar style= {appTheme === 'dark' ? 'light' : 'dark'}/>
        <View style={[styles.homescreenLogo_container,  appTheme === 'dark' ? styles.bgColorDark2 : styles.bgColorLight2]}>
          <Text style={[styles.logoText,appTheme === 'dark' ? styles.textColorDark : styles.textColorLight]}>NextCourier</Text>
          {appTheme === 'dark' ? <Image source={logoImgDark} style={[styles.logoImage]} /> :<Image source={logoImg} style={[styles.logoImage]} />}
        </View>
        <View style={[styles.homescreenInner_container, appTheme === 'dark' ? styles.bgColorDark2 : styles.bgColorLight2]}>
          <View style={styles.homescreenInner_1stRow}>
            <Pressable style={styles.homescreen_pressable} onPress={openPicked}>
              <FontAwesome5 style={styles.homescreenImage_pressable} name="box" size={40} color={appTheme === 'dark' ? 'white' : 'blue' } />
              <Text style={[styles.homescreenText_pressable, appTheme === 'dark' ? styles.textColorDark : styles.textColorLight]}>Picked{'\n'}Parcels</Text>
            </Pressable>
            
            <View style={styles.boxShadow}>
              <Pressable style={styles.homescreen_pressable} onPress={openDelivered}>
                <FontAwesome5 style={styles.homescreenImage_pressable} name="box-open" size={40} color={appTheme === 'dark' ? 'white' : 'green' } />
                <Text style={[styles.homescreenText_pressable, appTheme === 'dark' ? styles.textColorDark : styles.textColorLight]}>Delivered{'\n'}Parcels</Text>
              </Pressable>
            </View>

          </View>
        </View>
    </View>
  )
}



const styles = StyleSheet.create({
    homescreen_container: { 
      flex: 1, justifyContent: 'center', alignItems: 'center',
    },

    homescreenLogo_container: {
      width: '90%', height: '7%', borderRadius: 10, marginBottom: 10,
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    },

    logoText: { 
      fontSize: 20,
      fontStyle: 'italic',
     },

     logoImage: {
      width: 40, height: 40, 
     },

    homescreenInner_container: { 
      width: '90%', height: '75%', borderRadius: 10, marginBottom: 40,
    },

    homescreenInner_1stRow: {
     justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', marginTop: 50,
    },

    homescreen_pressable: { 
      alignItems: 'center', justifyContent: 'center',
    },

    homescreenImage_pressable: {
      marginTop: 1, marginBottom: 1,
    },

    homescreenText_pressable: {
      textAlign: 'center', marginTop: 5,
    },

    boxShadow: {
      shadowColor: '#0c94f5',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.7,
      elevation: 10,
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

export default HomeScreen