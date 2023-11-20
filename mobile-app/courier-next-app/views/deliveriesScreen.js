import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const DeliveriesScreen = () => {
  return (
    <View style={styles.deliveriesScreen_container}>
        <Text>DeliveryScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    deliveriesScreen_container: {
       flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000',
    }
})

export default DeliveriesScreen