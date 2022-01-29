import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Text, StatusBar, ScrollView, Image} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//components
import SearchBar from '../components/SearchBar';
import Credit from '../components/Credit';
import ItemCard from '../components/ItemCard';


function Shop({navigation}) {
  const db = firebase.firestore();

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()
  const [items, setItems] = useState([])
  const [show, setShow] = useState([])

  useFocusEffect(
    useCallback(() => {
    (
      async () => {
        const email = await AsyncStorage.getItem('session')
        const info = await db.collection('users').doc(email).get()
        setUser(info.data())

        const obj = await db.collection('shop').get()
        setItems([])
        setShow([])

        obj.forEach(doc => {
          setItems(current => {
            return [doc.data(), ...current]
          })

          setShow(current => {
            return [doc.data(), ...current]
          })
        })

        setLoading(false)
      }
    )()
  }, [])
  )

  const search = (val) => {
    const arr = items.filter(item => item.name.toLowerCase().startsWith(val))

    setShow(arr)
  }

  if(loading){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../assets/images/loading.gif')} style={{aspectRatio: 1, height: hp('20%')}} />
      </View>
    )
  }

  return(
      <ScrollView style={styles.screen}>
          <View>
            <Text style={styles.h1}>Shop</Text>
            <Text style={styles.subtext}>Redeem your credits in the shop.</Text>

            <Credit value={user? user.credit: 0} style={{position: 'absolute', right: wp('5%'), top: hp('3.4%')}} />
          </View>

          <SearchBar placeholder='Search Shop...' onChange={val => search(val)} />

          <View style={styles.main}>
            {show.map((item, key) => 
              <ItemCard key={key} name={item.name} price={item.price} img={item.img} onPress={() => navigation.navigate('item', {item: item, user: user})} />
            )}
          </View>
      </ScrollView>
  );
}


const styles = StyleSheet.create({
  screen: {
    marginTop: StatusBar.currentHeight
  },

  h1: {
    fontFamily: 'nunito_bold',
    fontSize: hp('5.5%'),
    paddingHorizontal: 15,
    color: '#94c037',
    marginTop: hp('1%')
  },

  subtext: {
    opacity: 0.6,
    fontFamily: 'nunito',
    fontSize: hp('2%'),
    marginTop: -3,
    paddingHorizontal: 20,
    marginBottom: hp('0.8%')
  },

  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: wp('90%'),
    alignSelf: 'center'
  }
})

export default Shop;
