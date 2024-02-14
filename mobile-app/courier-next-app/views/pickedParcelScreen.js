import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const PickedParcelScreen = ({navigation}) => {



  const goBackButton = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.pickedParcelScreen_container}>
      <View style={styles.pickedParcelScreen_topContainer}>
        <Pressable onPress={goBackButton}>
          <Ionicons style={styles.backButton} name="arrow-back" size={28} color="black" />
        </Pressable>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  pickedParcelScreen_container: {
    flex: 1, backgroundColor: '#00000', alignItems: 'center',
  },

  pickedParcelScreen_topContainer: {
    width: '90%', height: '10%', backgroundColor: 'white', flexDirection: 'row', borderRadius: 8,
    marginTop: 40, alignItems: 'center',
  },

  backButton: {
    marginLeft: 10,
  },

})

export default PickedParcelScreen