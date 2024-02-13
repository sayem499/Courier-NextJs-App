import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const logoImg = require('../assets/fast-delivery-truck.png');



const HomeScreen = ({navigation}) => {
  const { deliveryMan } = useSelector(state => state.deliveryManState);

  useState(()=> {
  },[])


  return (
    <View style={styles.homescreen_container}>
        <View style={styles.homescreenLogo_container}>
          <Text style={styles.logoText}>NextCourier</Text>
          <Image source={logoImg} style={styles.logoImage} />
        </View>
        <View style={styles.homescreenInner_container}>
          <View style={styles.homescreenInner_1stRow}>
            <Pressable style={styles.homescreen_pressable}>
              <FontAwesome5 style={styles.homescreenImage_pressable} name="box" size={40} color="blue" />
              <Text style={styles.homescreenText_pressable}>Picked{'\n'}Parcels</Text>
            </Pressable>
            
            <View style={styles.boxShadow}>
              <Pressable style={styles.homescreen_pressable}>
                <FontAwesome5 style={styles.homescreenImage_pressable} name="box-open" size={40} color="green" />
                <Text style={styles.homescreenText_pressable}>Delivered{'\n'}Parcels</Text>
              </Pressable>
            </View>

          </View>
        </View>
    </View>
  )
}



const styles = StyleSheet.create({
    homescreen_container: { 
      flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e1e3e3',
    },

    homescreenLogo_container: {
      width: '90%', height: '6%', backgroundColor: 'white', borderRadius: 10, marginBottom: 10,
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    },

    logoText: { 
      fontSize: 18,
      fontStyle: 'italic',
     },

     logoImage: {
      width: 30, height: 30, 
     },

    homescreenInner_container: { 
      width: '90%', height: '75%', backgroundColor: 'white', borderRadius: 10, marginBottom: 40,
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


    
})

export default HomeScreen