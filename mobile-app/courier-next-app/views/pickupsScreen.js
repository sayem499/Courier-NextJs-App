import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, RefreshControl, Platform, Linking, ToastAndroid } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useGetDeliveryWithPhonenumberMutation } from '../redux/delivery/deliveryApiSlice';
import { useGetParcelStatusesWithIdsMutation } from '../redux/parcelStatus/parcelStatusApiSlice';
import { AntDesign } from '@expo/vector-icons';
import { resetParcelStatus, setParcelStatuses } from '../redux/parcelStatus/parcelStatusSlice';
import { setDeliveryMan } from '../redux/deliveryMan/deliveryManSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { useGetParcelsWithTrackerIdMutation } from '../redux/parcel/parcelApiSlice';


const PickupsScreen = ({ navigation }) => {
  const { appTheme } = useSelector((state) => state.themeState);
  const dispatch = useDispatch();
  const { deliveryMan } = useSelector((state) => state.deliveryManState);
  const [searchText, setSearchText] = useState('');
  const { parcelStatuses } = useSelector((state) => state.parcelStatusState);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [getParcelStatusesWithIds] = useGetParcelStatusesWithIdsMutation();
  const [getParcelsWithTrackerId] = useGetParcelsWithTrackerIdMutation();
  const isFocused = useIsFocused();
  const [refresh, setRefresh] = useState(false);
  const [getDeliveryWithPhonenumber] = useGetDeliveryWithPhonenumberMutation();

  const onRefresh = () => {
    setRefresh(true);
    getDeliveriesFunction();
    setTimeout(() => {
      setRefresh(false);
    }, 1000)
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(resetParcelStatus());
      if (deliveryMan?.length > 0) {
        onRefresh();
      } else {
        getDeliveryManData();
      }
    } else {
      dispatch(resetParcelStatus());
    }

  }, [isFocused, deliveryMan])

  const getDeliveryManData = async () => {
    try {
      const res = await AsyncStorage.getItem('deliveryman');
      const parsedResult = JSON.parse(res);
      res && dispatch(setDeliveryMan(parsedResult));
    } catch (err) {
      console.error(err.error || err.data?.message)
    }
  }

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


  const callNumber = async (item) => {
    try {
      let tracker_id = item._id;
      const parcelRes = await getParcelsWithTrackerId({ tracker_id }).unwrap();

      if (parcelRes?.length > 0) {
        let phoneNumber;

        if (Platform.OS !== 'android') {
          phoneNumber = `telprompt:${parcelRes[0].senderPhonenumber}`;
        } else {
          phoneNumber = `tel:${parcelRes[0].senderPhonenumber}`;
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

    } catch (err) {
      console.error(err.error || err.data?.message);
    }

  }


  const getDeliveriesFunction = async () => {
    try {
      let deliveryMan_phonenumber = deliveryMan[0].deliveryMan_phonenumber;
      const resDeliveries = await getDeliveryWithPhonenumber({ deliveryMan_phonenumber }).unwrap();
      if (resDeliveries.length > 0) {
        resDeliveries.map(item => {
          getFilteredPickups(item.pickups)
        })

      }

    } catch (err) {
      console.error(err?.data?.message || err.error);
    }

  }

  const searchDeliveries = () => {
    setShowSearchResult(true);
  }


  return (
    <View style={[styles.pickupsScreen_container, appTheme === 'dark' ? styles.bgColorDark1 : styles.bgColorLight1]}>
      <View style={styles.searchBar_container}>
        <TextInput style={[styles.searchInput, styles.boxShadow, appTheme === 'dark' ? styles.textColorDark : styles.textColorLight, appTheme === 'dark' ? styles.bgColorDark2 : styles.bgColorLight2, appTheme === 'dark' ? styles.boxShadowDark : styles.boxShadowLight]} placeholder='Search...' placeholderTextColor={appTheme === 'dark' ? '#d6d6d6' : 'gray'} value={searchText} onChangeText={setSearchText} />
        <Pressable style={[styles.searchButton, styles.boxShadow, appTheme === 'dark' ? styles.bgColorDark2 : styles.bgColorLight2]} onPress={searchDeliveries}>
          <AntDesign name="search1" size={24} color={appTheme === 'dark' ? '#d6d6d6' : 'black'} />
        </Pressable>
      </View>

      <ScrollView style={styles.pickupsCard_container} contentContainerStyle={{ justifyContent: 'center' }}
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>
        {
          showSearchResult ? parcelStatuses?.filter((item) => (item._id.toLowerCase().includes(searchText.toLowerCase()) && item.isPicked !== true)).map((item) => {
            return <Pressable style={styles.pickupsCardPressable} key={item._id} onPress={() => navigation.push('DeliveryDetailsScreen', { item: item._id, isPickup: true })}>
              <View style={[styles.pickupsCard, styles.boxShadow, appTheme === 'dark' ? styles.bgColorDark2 : styles.bgColorLight2, appTheme === 'dark' ? styles.boxShadowDark : styles.boxShadowLight]}>
                <Text style={[styles.cardInnerTextStyles, appTheme === 'dark' ? styles.textColorDark : styles.textColorLight]} >{item._id}</Text>
                <Pressable onPress={() => callNumber(item)}>
                  <FontAwesome name="mobile-phone" size={40} color={appTheme === 'dark' ? '#d6d6d6' : "black"} />
                </Pressable>
              </View>
            </Pressable>
          }) :
            parcelStatuses?.filter((item) => (item.isPicked !== true)).map((item) => {
              return <Pressable style={styles.pickupsCardPressable} key={item._id} onPress={() => navigation.push('DeliveryDetailsScreen', { item: item._id, isPickup: true })}>
                <View style={[styles.pickupsCard, styles.boxShadow, appTheme === 'dark' ? styles.bgColorDark2 : styles.bgColorLight2, appTheme === 'dark' ? styles.boxShadowDark : styles.boxShadowLight]}>
                  <Text style={[styles.cardInnerTextStyles, appTheme === 'dark' ? styles.textColorDark : styles.textColorLight]} >{item._id}</Text>
                  <Pressable onPress={() => callNumber(item)}>
                    <FontAwesome name="mobile-phone" size={40} color={appTheme === 'dark' ? '#d6d6d6' : "black"} />
                  </Pressable>
                </View>
              </Pressable>
            })

        }

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  pickupsScreen_container: {
    flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000',
  },

  pickupsCard_container: {
    flex: 1, width: '100%', marginBottom: 80, marginTop: 20,
  },

  pickupsCard: {
    width: '90%', height: 150, marginBottom: 10, backgroundColor: 'white', alignItems: 'center',
    justifyContent: 'center', borderRadius: 10, marginTop: 10, flexDirection: 'row',
  },

  pickupsCardPressable: {
    alignItems: 'center', justifyContent: 'center',
  },

  cardInnerTextStyles: { fontSize: 30, marginRight: 20 },

  searchBar_container: {
    alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
  },

  searchInput: {
    width: '75%', height: 60, marginTop: 50, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, paddingLeft: 10,
    fontSize: 20, backgroundColor: 'white',
  },

  searchButton: {
    alignItems: 'center', justifyContent: 'center', height: 60, width: '15%',
    backgroundColor: 'white', marginTop: 50, borderBottomRightRadius: 10, borderTopRightRadius: 10,
  },

  buttonText: {
    color: "white", fontSize: 15,
  },

  boxShadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    elevation: 10,
  },

  boxShadowDark: {
    shadowColor: '#cbddf7',
  },

  boxShadowLight: {
    shadowColor: '#0c94f5',
  },

  bgColorDark1: {
    backgroundColor: '#020538',
  },

  bgColorLight1: {
    backgroundColor: '#e1e3e3',
  },

  bgColorDark2: {
    backgroundColor: '#263375',
  },

  bgColorLight2: {
    backgroundColor: 'white',
  },

  textColorDark: {
    color: 'white',
  },

  textColorLight: {
    color: 'black',
  },


})
export default PickupsScreen;