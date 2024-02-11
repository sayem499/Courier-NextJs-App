import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';




const HomeScreen = ({navigation}) => {
  const { deliveryMan } = useSelector(state => state.deliveryManState);

  useState(()=> {
  },[])
  return (
    <View style={styles.homescreen_container}>
        <Text>HomeScreen</Text>
    </View>
  )
}



const styles = StyleSheet.create({
    homescreen_container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e1e3e3',}
})

export default HomeScreen