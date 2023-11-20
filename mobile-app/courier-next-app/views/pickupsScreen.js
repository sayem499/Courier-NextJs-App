import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PickupsScreen = () => {
  return (
    <View style={styles.pickupsScreen_container}>
        <Text>PickupsScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    pickupsScreen_container: {
       flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000',
    }
})
export default PickupsScreen;