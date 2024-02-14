import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Pressable, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { useGetDeliveryWithPhonenumberMutation } from '../redux/delivery/deliveryApiSlice';
import { resetParcelStatus, setParcelStatuses } from '../redux/parcelStatus/parcelStatusSlice';
import { useGetParcelStatusesWithIdsMutation } from '../redux/parcelStatus/parcelStatusApiSlice';

const PickedParcelScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { parcelStatuses } = useSelector((state) => state.parcelStatusState);
  const { deliveryMan } = useSelector((state) => state.deliveryManState);


  const [getDeliveryWithPhonenumber] = useGetDeliveryWithPhonenumberMutation();
  const [getParcelStatusesWithIds] = useGetParcelStatusesWithIdsMutation();

  const [refresh, setRefresh] = useState(false);


  const onRefresh = () => {
    setRefresh(true);
    getDeliveriesFunction();
    setTimeout(() => {
      setRefresh(false);
    }, 1000)
  }

  useEffect(() => {
    if (isFocused) {
      dispatch(resetParcelStatus());
      if (deliveryMan?.length > 0) {
        onRefresh();
      }
    } else {
      dispatch(resetParcelStatus())
    }
  }, [isFocused])

  const goBackButton = () => {
    navigation.goBack();
  }

  //Function to fetch deliveries using deliveryman phonenumber
  const getDeliveriesFunction = async () => {
    try {
      let temp = JSON.parse(deliveryMan);
      let deliveryMan_phonenumber = temp.deliveryMan_phonenumber;
      const resDeliveries = await getDeliveryWithPhonenumber({ deliveryMan_phonenumber }).unwrap();
      if (resDeliveries.length > 0) {
        resDeliveries.map(item => {
          getFilteredPickups(item.pickups)
        })
      }
    } catch (err) {
      console.error(err.data?.message || err.error);
    }
  }

  //Function to get parcelstatuses using tracker ids.
  const getFilteredPickups = async (ids) => {
    try {
      if (ids) {
        const resParcelStatus = await getParcelStatusesWithIds({ ids }).unwrap();
        if (resParcelStatus?.length > 0) {
          dispatch(setParcelStatuses(resParcelStatus));
        }
      } else {
        dispatch(resetParcelStatus());
      }

    } catch (err) {
      console.error(err.error || err.data?.message);
    }
  }

  return (
    <View style={styles.pickedParcelScreen_container}>
      <View style={styles.pickedParcelScreen_topContainer}>
        <Pressable onPress={goBackButton}>
          <Ionicons style={styles.backButton} name="arrow-back" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.pickedParcelScreen_bottomContainer}>
        <ScrollView style={styles.pickedParcelList_container} contentContainerStyle={{ justifyContent: 'center' }}
          refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />} >
          {
            parcelStatuses?.filter((item) => item.isPicked === true).map((item) => {
              return <Pressable style={styles.listItemPressable} key={item._id}>
                <View style={[styles.listItem, styles.boxShadow]}>
                  <Text style={styles.listItemText}>{item._id}</Text>
                </View>
              </Pressable>
            })
          }
        </ScrollView>
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

  pickedParcelScreen_bottomContainer: {
    width: '90%', height: '80%', backgroundColor: 'white', borderRadius: 8, marginTop: 10,
  },

  pickedParcelList_container: {
    width: '100%', marginTop: 5,
  },

  listItemPressable: {
    alignItems: 'center', justifyContent: 'center',
  },

  listItem: {
    width: '90%', height: 50, borderRadius: 8, backgroundColor: 'white', marginTop: 10, marginBottom: 15,
    alignItems: 'center', justifyContent: 'center',
  },

  listItemText: {
    fontSize: 20,
  },





  boxShadow: {
    shadowColor: '#0d8c2e',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    elevation: 10,
  },


})

export default PickedParcelScreen