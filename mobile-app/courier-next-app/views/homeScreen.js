import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = () => {
  return (
    <View style={styles.homescreen_container}>
        <Text>HomeScreen</Text>
        <Button title='Logout' onPress={logOut}/>
    </View>
  )
}

const logOut = async () => {
  await AsyncStorage.removeItem('deliveryman');
} 

const styles = StyleSheet.create({
    homescreen_container: { flex: 1, justifyContent: 'center', alignItems: 'center',}
})

export default HomeScreen