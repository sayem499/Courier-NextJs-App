import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const DeliveredParcelScreen = ({ navigation }) => {



    const goBackButton = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.deliveredParcelScreen_container}>
            <View style={styles.deliveredParcelScreen_topContainer}>
                <Pressable onPress={goBackButton}>
                    <Ionicons style={styles.backButton} name="arrow-back" size={24} color="black" />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    deliveredParcelScreen_container: {
        flex: 1, backgroundColor: '#00000', alignItems: 'center',
    },

    deliveredParcelScreen_topContainer: {
        width: '90%', height: '10%', backgroundColor: 'white', flexDirection: 'row', borderRadius: 8,
        marginTop: 40, alignItems: 'center',
    },

    backButton: {
        marginLeft: 10,
      },
})

export default DeliveredParcelScreen