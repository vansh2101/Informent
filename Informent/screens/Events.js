import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Text, ScrollView, StatusBar, Pressable, TouchableOpacity, Image} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//components
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';


function Events({navigation}) {
  const db = firebase.firestore();

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()
  const [active, setActive] = useState()
  const [events, setEvents] = useState([])
  const [show, setShow] = useState([])

  useFocusEffect(
    useCallback(() => {
    (
      async() => {
        const email = await AsyncStorage.getItem('session')
        const info = await db.collection('users').doc(email).get()
        setUser(info.data())

        const obj = await db.collection('events').get()
        setEvents([])
        setShow([])

        obj.forEach(doc => {
          if(doc.data().status){
            setEvents(current => {
              return [doc.data(), ...current]
            })

            setShow(current => {
              return [doc.data(), ...current]
            })
          }
        })

        setLoading(false)
      }
    )()
  }, [])
  )

  const plant = () => {
    if(active){
      setShow(events)
      setActive(null)
    }
    else{
      setShow(events.filter(item => item.type == 'plant'))
      setActive(true)
    }
  }

  const make = () => {
    if(active == false){
      setShow(events)
      setActive(null)
    }
    else{
      setShow(events.filter(item => item.type == 'make'))
      setActive(false)
    }
  }

  const search = (val) => {
    const arr = events.filter(item => item.name.toLowerCase().startsWith(val))

    setShow(arr)
    setActive(null)
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
          <View style={{width: wp('90%'), alignSelf: 'center'}}>
            <Text style={styles.h1}>Events</Text>
            <Text style={styles.subtext}>Volunteer in different events and workshops organized by different organizations</Text>

            {user.type == 'Organization' ? 
              <TouchableOpacity style={styles.notificationContainer} onPress={() => navigation.navigate('addevent', {user:user})}>
                <MaterialIcons name="add" size={hp('3.4%')} color="black" style={{opacity: 0.5}} />
              </TouchableOpacity>
            :<></>}
          </View>

          <SearchBar placeholder='Search Events...' onChange={val => search(val)} />

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 5}}>
            <Pressable style={active ? {...styles.filterBox, backgroundColor: '#94c037'} : styles.filterBox } onPress={plant}>
              <MaterialCommunityIcons name="leaf" size={23} color={active ? 'white': '#94c037'} />
              <Text style={active ? {...styles.Txt, color: 'white'} : styles.Txt}>Plantation</Text>
            </Pressable>

            <Pressable style={active == false ? {...styles.filterBox, backgroundColor: '#94c037'} : styles.filterBox } onPress={make}>
              <MaterialCommunityIcons name="toy-brick" size={23} color={active ==false ? 'white': '#94c037'} />
              <Text style={active==false ? {...styles.Txt, color: 'white'} : styles.Txt}>Making</Text>
            </Pressable>
          </View>

          <View>
            {show.map((item, key) => 
              <EventCard key={key} item={item} onPress={() => navigation.navigate('eventdetails', {item: item, user: user})} />
            )}
          </View>
      </ScrollView>
  );
}


const styles = StyleSheet.create({
  screen: {
    marginTop: StatusBar.currentHeight,
  },

  h1: {
    fontFamily: 'nunito_bold',
    fontSize: hp('5.5%'),
    color: '#94c037',
    marginTop: hp('1%')
  },

  subtext: {
    opacity: 0.6,
    fontFamily: 'nunito',
    fontSize: hp('2%'),
    marginTop: -3,
    marginBottom: hp('0.8%')
  },

  filterBox: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#94c037',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('40%')
  },

  Txt: {
    fontFamily: 'nunito',
    color: '#94c037',
    marginLeft: 5
  },

  notificationContainer: {
    backgroundColor: 'rgba(148, 192, 55, 0.45)',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: hp('1.9%')
  }
})

export default Events;
