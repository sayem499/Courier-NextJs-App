import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setDeliveryMan } from "../redux/deliveryMan/deliveryManSlice";
import { setThemeState } from "../redux/theme/themeSlice";
import {Appearance} from 'react-native';

const logoImg = require('../assets/fast-delivery-truck.png');



function SplashScreen({ navigation }) {
  const {appTheme} = useSelector(state => state.themeState);
  const systemTheme = Appearance.getColorScheme();
  const dispatch = useDispatch();
  const slideInAnim = useRef(new Animated.Value(0)).current;
  const startAnimation = () => {
    Animated.spring(slideInAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }
  useEffect(() => {
    getThemeData();  
    startAnimation();

    const getStorageData = async () => {
      try {
        let res = await AsyncStorage.getItem('deliveryman');
        let result = JSON.parse(res)
        if (res) {
          dispatch(setDeliveryMan(result));
          navigation.replace('HomeScreen');
        } else {
          setTimeout(() => {
            navigation.replace('LoginScreen');
          }, 2000)
        }
      } catch (err) {
        console.error(err);
      }

    }
    getStorageData()
    
  }, [])
  
  const getThemeData = async () => {
    try{
      const val = await AsyncStorage.getItem('theme');
      if(val === 'dark' || val === 'light')
        dispatch(setThemeState(val));
      else
        dispatch(setThemeState(systemTheme));
    }catch(err){
      console.error(err);
    }
  }

  return (
    <View style={styles.splashView_container}>
      <Animated.View style={[
        { transform: 
          [{ translateX: slideInAnim.interpolate({ inputRange: [0, 1], outputRange: [-800, 0] }) }] 
        }
      ]}><Image source={logoImg} style={styles.splashLogo} /></Animated.View>
      <Text style={styles.splashText_1}>NextCourier</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  splashView_container: {
    flex: 1, backgroundColor: "white", alignItems: 'center', justifyContent: 'center'
  },

  splashText_1: {
    fontSize: 40,
    fontStyle: "italic",
  },

  splashLogo: {
    width: 250, height: 158,
  },

  splashLogo_animation: {
  },
});

export default SplashScreen;