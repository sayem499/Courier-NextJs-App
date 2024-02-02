import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useGetDeliveryWithPhonenumberMutation } from '../redux/delivery/deliveryApiSlice';
import { setDeliveries } from '../redux/delivery/deliverySlice';
import { AntDesign } from '@expo/vector-icons';


const PickupsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [ searchText, setSearchText ] = useState('');
  const { deliveries } = useSelector((state) => state.deliveryState);
  const [ showSearchResult, setShowSearchResult] = useState(false);
  const { deliveryMan } = useSelector((state) => state.deliveryManState);
  let tempDeliveries = [];
  const [getDeliveryWithPhonenumber] = useGetDeliveryWithPhonenumberMutation();

  useEffect(() => {
    if(deliveries.length === 0)
      getDeliveriesFunction(deliveryMan);


  }, [])

  if(deliveries?.length !== tempDeliveries?.length ){
    tempDeliveries = deliveries;
  }

  const getDeliveriesFunction = async (deliveryMan) => {
    try {
      let temp = JSON.parse(deliveryMan)
      let deliveryMan_phonenumber = temp.deliveryMan_phonenumber;
      const res = await getDeliveryWithPhonenumber({ deliveryMan_phonenumber }).unwrap();
      if (res.length > 0) {
        dispatch(setDeliveries(res));
      }

    } catch (err) {
      console.log(err?.data?.message || err.error);
    }

  }

  const searchDeliveries = () => {
   setShowSearchResult(true);
  }
  

  return (
    <View style={styles.pickupsScreen_container}>
      <View style={styles.searchBar_container}>
        <TextInput style={[styles.searchInput, styles.boxShadow]} placeholder='Search...' value={searchText} onChangeText={setSearchText}/>
        <Pressable style={[styles.searchButton, styles.boxShadow]} onPress={searchDeliveries}>
          <AntDesign name="search1" size={24} color="black" />
        </Pressable>
      </View>

      <ScrollView style={styles.pickupsCard_container}>
        { tempDeliveries.map((item) => 
           showSearchResult ? item.pickups.filter((item) => ( item.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))).map((item)=>{
           return <Pressable key={item} onPress={() => navigation.push('DeliveryDetailsScreen', { item })}>
           <View style={[styles.pickupsCard, styles.boxShadow]}>
             <Text style={styles.cardInnerTextStyles} >Tracker ID : {item}</Text>
           </View>
         </Pressable>
          }): 
          item.pickups.map((item) => {
              return <Pressable key={item} onPress={() => navigation.push('DeliveryDetailsScreen', { item })}>
                  <View style={[styles.pickupsCard, styles.boxShadow]}>
                    <Text style={styles.cardInnerTextStyles} >Tracker ID : {item}</Text>
                  </View>
                </Pressable>
            })
      )
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
    flex: 1, width: '90%', marginBottom: 80, marginTop: 20,
  },

  pickupsCard: {
    width: '100%', height: 150, marginBottom: 10, backgroundColor: 'white', alignItems: 'center',
    justifyContent: 'center', borderRadius: 8,
  },

  cardInnerTextStyles: { fontSize: 20, },

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
    shadowColor: '#0c94f5',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    elevation: 2,
  },


})
export default PickupsScreen;