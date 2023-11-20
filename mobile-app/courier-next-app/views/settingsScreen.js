import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.settingsScreen_container}>
        <Text>SettingsScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    settingsScreen_container: {
       flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000',
    }
})

export default SettingsScreen;