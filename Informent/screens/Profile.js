import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, StatusBar, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//components
import IconText from '../components/IconText';
import Credit from '../components/Credit';


function Profile({navigation}) {
  const db = firebase.firestore();

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()
  const [events, setEvents] = useState([])
  const [articles, setArticles] = useState([])
  const [order, setOrders] = useState([])

  useFocusEffect(
    useCallback(() => {
    (
      async () => {
        const email = await AsyncStorage.getItem('session')
        const info = await db.collection('users').doc(email).get()
        setUser(info.data())

        if(info.data().type == 'Organization'){

          const obj = await db.collection('events').get()
          setEvents([])

          obj.forEach(doc => {
            if(doc.data().email == email){
              setEvents(current => {
                return [doc.data(), ...current]
              })
            }
          })

          const info = await db.collection('articles').get()
          setArticles([])

          info.forEach(doc => {
            if(doc.data().email == email){
              setArticles(current => {
                return [doc.data(), ...current]
              })
            }
          })

        }
        else{
          const obj = await db.collection('users').doc(email).collection('orders').get()
          
          setOrders([])

          obj.forEach(doc => {
            setOrders(current => {
              return [doc.data(), ...current]
            })
          })
        }

        setLoading(false)
      }
    )()
  }, [])
  )

  const logout = async () => {
    await AsyncStorage.removeItem('session')

    navigation.navigate('login')
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

        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: hp('3%')}}>
          <Image source={require('../assets/images/pfp.png')} style={styles.pfp} />

          <View style={{marginLeft: wp('5%')}}>
            <Text style={styles.h1}>{user.name}</Text>
            <Text style={styles.subtext}>{user.city}, {user.state}</Text>
          </View>
        </View>

        <View style={{marginTop: hp('2%')}}>
          {user.type == 'Individual' ?
          <IconText icon='person' text={user.gender} iconSize={22} textStyle={styles.iconText} style={{marginTop: hp('0.5%')}} />
          :<></>}

          <IconText icon='local-phone' text={user.phone} iconSize={22} textStyle={styles.iconText} style={{marginTop: hp('0.5%')}} />

          <IconText icon='mail' text={user.email} iconSize={22} textStyle={styles.iconText} style={{marginTop: hp('0.5%')}} />

          <IconText icon='location-pin' text={user.address} iconSize={22} textStyle={{...styles.iconText, lineHeight: 27}} style={{marginTop: hp('1.5%')}} />
        </View>

        {user.type == 'Individual' ?
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2.5%')}}>
          <View style={styles.box}>
            <Credit value={user.credit} iconSize={wp('5.5%')} iconStyle={{width: wp('8.5%')}} textStyle={{fontSize: hp('5.5%')}} />

            <Text style={{...styles.subtext, fontSize: hp('2%')}}>CREDITS</Text>
          </View>

          <View style={styles.box}>
            <Text style={{fontSize: hp('6%'), fontFamily: 'dongle'}}>{order.length}</Text>

            <Text style={{...styles.subtext, fontSize: hp('2%'), marginTop: -7}}>ORDERS</Text>
          </View>
        </View>

        :

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2.5%')}}>
          <View style={styles.box}>
            <Text style={{fontSize: hp('6%'), fontFamily: 'dongle'}}>{events.length}</Text>

            <Text style={{...styles.subtext, fontSize: hp('2%')}}>EVENTS</Text>
          </View>

          <View style={styles.box}>
            <Text style={{fontSize: hp('6%'), fontFamily: 'dongle'}}>{articles.length}</Text>

            <Text style={{...styles.subtext, fontSize: hp('2%'), marginTop: -7}}>ARTICLES</Text>
          </View>
        </View>
        }

        <View style={{marginTop: hp('3%')}}>
          {user.type == 'Individual' ?
          <>
          <TouchableOpacity style={{flexDirection: 'row', paddingVertical: 10}} onPress={() => navigation.navigate('Shop')}>
            <MaterialIcons name="add-shopping-cart" size={hp('4.7%')} color="black" style={{opacity: 0.7}}/>
            <Text style={styles.links}>Shop</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{flexDirection: 'row', paddingVertical: 10}}>
            <MaterialIcons name="shopping-cart" size={hp('4.7%')} color="black" style={{opacity: 0.7}} />
            <Text style={styles.links}>My Orders</Text>
          </TouchableOpacity>
          </>

          :
          <>
          <TouchableOpacity style={{flexDirection: 'row', paddingVertical: 10}}>
            <Ionicons name="leaf" size={hp('4.7%')} color="black" style={{opacity: 0.7}}/>
            <Text style={styles.links}>My Events</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{flexDirection: 'row', paddingVertical: 10}}>
            <MaterialIcons name="text-snippet" size={hp('4.7%')} color="black" style={{opacity: 0.7}} />
            <Text style={styles.links}>My Articles</Text>
          </TouchableOpacity>
          </>
          }

          <TouchableOpacity style={{flexDirection: 'row', paddingVertical: 10}} onPress={logout}>
            <MaterialIcons name="logout" size={hp('4.7%')} color="red" style={{opacity: 0.7}} />
            <Text style={{...styles.links, color: 'red'}}>Logout</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
  );
}


const styles = StyleSheet.create({
  screen: {
    marginTop: StatusBar.currentHeight + 20,
    width: wp('92%'),
    alignSelf: 'center'
  },

  pfp:{
    borderRadius: wp('50%'),
    width: wp('25%'),
    aspectRatio: 1
  },

  h1: {
    fontFamily: 'nunito_bold',
    fontSize: hp('3.6%'),
    color: '#94c037'
  },

  subtext: {
    opacity: 0.6,
    fontFamily: 'nunito',
    fontSize: hp('2.3%'),
  },

  iconText: {
    fontSize: hp('3.6%'),
    marginLeft: wp('2%'), 
  },

  box: {
    backgroundColor: 'rgba(148, 192, 55, 0.45)',
    borderRadius: 12,
    padding: 15,
    width: wp('42%'),
    alignItems: 'center',
    justifyContent: 'center'
  },

  links: {
    fontFamily: 'nunito',
    marginLeft: wp('2%'),
    fontSize: hp('3%'),
    opacity: 0.7
  }
})

export default Profile;
