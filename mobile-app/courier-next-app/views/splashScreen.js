import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { useEffect, useRef } from "react";
const logoImg = require('../assets/fast-delivery-truck.png');



function SplashScreen() {
  const slideInAnim = useRef(new Animated.Value(0)).current;
  const startAnimation = () => {
    Animated.spring(slideInAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
    }).start();
  } 
  useEffect(() => {
    startAnimation();
  },[])
  return (
    <View style={styles.splashView_container}>
        <Animated.View style = {[{transform:[{translateX: slideInAnim.interpolate({inputRange: [0, 1], outputRange:[-800,0]})}]}]}><Image source={logoImg} style={styles.splashLogo}/></Animated.View>
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