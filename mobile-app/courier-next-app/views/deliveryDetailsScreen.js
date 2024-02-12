import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, ToastAndroid, Platform, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useGetParcelsWithTrackerIdMutation } from '../redux/parcel/parcelApiSlice';
import { setParcels } from '../redux/parcel/parcelSlice';
import { useUpdateParcelStatusWithTrackerIdMutation } from '../redux/parcelStatus/parcelStatusApiSlice';
import { updatedParcelStatuses } from '../redux/parcelStatus/parcelStatusSlice';



const DeliveryDetailsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [updateParcelStatusWithId] = useUpdateParcelStatusWithTrackerIdMutation();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [getParcelsWithTrackerId] = useGetParcelsWithTrackerIdMutation();
  const { parcels } = useSelector((state) => state.parcelState);
  const route = useRoute();
  const pickup = route.params?.item;
  const isPickup = route.params?.isPickup;

  const getParcelDetails = async (pickup) => {
    try {
      let tracker_id = pickup
      const result = await getParcelsWithTrackerId({ tracker_id }).unwrap();
      dispatch(setParcels(result));
    } catch (err) {
      ToastAndroid.show(err.error || err.data?.message);
    }

  }


  useEffect(() => {
    getParcelDetails(pickup);
  }, [])



  const confirmModal = () => {
    setShowConfirmationModal(true);
  }


  const confirmDone = async (_id) => {

    try {
      let datetime = new Date();
      let isPicked = true;
      let parcelStatus = `${datetime.toLocaleString()}: Parcel picked up by delivery man.`;
      const res = await updateParcelStatusWithId({ _id, parcelStatus, isPicked }).unwrap();
      if (res) {
        dispatch(updatedParcelStatuses(res));
        setShowConfirmationModal(false);
      }
    } catch (err) {
      console.log(err.error || err.data?.message || err.message);
    }

  }

  const cancelModal = () => {
    setShowConfirmationModal(false);
  }

  const cancelBack = () => {
    navigation.goBack();
  }

  const callNumber = async (number) => {
    let phoneNumber;

    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${number}`;
    } else {
      phoneNumber = `tel:${number}`;
    }

    try {
      const response = await Linking.canOpenURL(phoneNumber);
      if (response) {
        await Linking.openURL(phoneNumber);
      } else {
        ToastAndroid.show('Invalid Phonenumber Data.');
      }
    } catch (err) {
      ToastAndroid.show(err.error || err.data?.message);
    }


  }

  return (
    <View style={styles.details_container}>

      <Modal
        visible={showConfirmationModal}
        animationType='fade'
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalInnerContainer, styles.boxShadow]}>
            <View style={styles.modalTextView}>
              <Text style={styles.detailsText}>Confirm Pickups ?</Text>
            </View>
            <View style={styles.modalButtonView}>
              <Pressable style={[styles.confirmButton, styles.boxShadow]} onPress={() => confirmDone(pickup)}>
                <Text style={[styles.buttonText]}>Confirm</Text>
              </Pressable>
              <Pressable style={[styles.cancelButton, styles.boxShadow]} onPress={cancelModal}>
                <Text style={[styles.buttonText]}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {
        parcels.map((item) => (
          <View key={item} style={[styles.detailsUpper_container,  styles.boxShadow]}>
            <Text style={styles.detailsText}>Tracker ID : {item.tracker_id}</Text>
            {
              isPickup ? <View style={styles.phoneNumber}><Text style={[styles.detailsText]}>Sender Phonenumber : </Text><View><Pressable onPress={() => callNumber(item.senderPhonenumber)}><Text style={styles.detailsText} >{item.senderPhonenumber}</Text></Pressable></View></View> :
                <View style={styles.phoneNumber}><Text style={[styles.detailsText]}>Receiver Phonenumber : </Text><View><Pressable onPress={() => callNumber(item.receiverPhonenumber)}><Text style={styles.detailsText}>{item.receiverPhonenumber}</Text></Pressable></View></View>
            }
            <Text style={styles.detailsText}>Sender Name : {item.senderName}</Text>
            <Text style={styles.deliveryCostText}>Delivery Cost : {"    " + item.deliveryCost + 'Tk.'}</Text>
          </View>
        ))
      }

      <View style={[styles.detailsLower_container, styles.boxShadow]}>
        <Pressable style={[styles.doneButton, styles.boxShadow]} onPress={confirmModal}>
          <Text style={styles.buttonText}>Done</Text>
        </Pressable>
        <Pressable style={[styles.backButton, styles.boxShadow]} onPress={cancelBack}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({

  details_container: {
    flex: 1, marginTop: 30, alignItems: 'center', justifyContent: 'center',
  },

  detailsUpper_container: {
    width: '100%', height: '40%', alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'white', marginTop: 20,
  },

  detailsLower_container: {
    flexDirection: 'row', width: '100%', height: '20%', justifyContent: 'center',
    backgroundColor: 'white', alignItems: 'center',
  },

  doneButton: {
    width: '30%', height: 50, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'green', borderRadius: 5, marginRight: 10,
  },

  backButton: {
    width: '30%', height: 50, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'red', borderRadius: 5, marginLeft: 10,
  },

  modalContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(165, 168, 166, 0.6)',
  },

  modalInnerContainer: {
    width: '80%', height: '30%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',
    borderRadius: 5,
  },

  modalButtonView: {
    height: '40%', width: '100%', alignItems: 'center', justifyContent: 'center',
    flexDirection: 'row',
  },

  modalTextView: {
    height: '10%', width: '100%', alignItems: 'center', justifyContent: 'center',
  },

  confirmButton: {
    width: 100, height: 50, backgroundColor: '#0c94f5', marginRight: 10, justifyContent: 'center', alignItems: 'center',
    borderRadius: 5,
  },

  cancelButton: {
    width: 100, height: 50, backgroundColor: 'red', marginleft: 10, justifyContent: 'center', alignItems: 'center',
    borderRadius: 5,
  },

  detailsText: {
    fontSize: 18,
  },

  deliveryCostText: {
    fontSize: 22, marginTop: 20,
  },

  buttonText: {
    alignItems: 'center', color: 'white',
  },

  phoneNumber: {
    flexDirection: 'row',
  },

  boxShadow: {
    shadowColor: '#0c94f5',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 10,
  },
})

export default DeliveryDetailsScreen