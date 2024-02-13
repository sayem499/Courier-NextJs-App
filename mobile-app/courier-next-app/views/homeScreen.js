import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Image } from 'react-native';

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
      width: '90%', height: '75%', backgroundColor: 'white', borderRadius: 10, marginBottom: 60,
    },

    
})

export default HomeScreen