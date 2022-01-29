import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, StatusBar} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

//components
import SearchBar from '../components/SearchBar';
import ArticleCard from '../components/ArticleCard';


function Articles({navigation}) {
  const db = firebase.firestore();

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()
  const [articles, setArticles] = useState([])
  const [show, setShow] = useState([])

  useFocusEffect(
    useCallback(() => {
    (async () => {
        const email = await AsyncStorage.getItem('session')
        const info = await db.collection('users').doc(email).get()
        setUser(info.data())

        const obj = await db.collection('articles').get()
        setArticles([])
        setShow([])

        obj.forEach(doc => {
          setArticles(current => {
            return [doc.data(), ...current]
          })

          setShow(current => {
            return [doc.data(), ...current]
          })
        })

        setLoading(false)
    }) ()
  }, [])
  )

  const search = (val) => {
    const arr = articles.filter(item => item.name.toLowerCase().startsWith(val.toLowerCase()))
    
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
          <View style={styles.header}>
            <Image source={require('../assets/images/pfp.png')} style={styles.pfp} />

            <View style={{marginLeft: wp('4%')}}>
              <Text style={styles.h1}>Hi, {user.name.split(' ')[0]}!</Text>
              <Text style={styles.subtext}>Good Evening</Text>
            </View>

            {user.type == 'Individual' ? 
              <TouchableOpacity style={styles.notificationContainer} onPress={() => console.log('notifications')}>
                <MaterialIcons name="notifications" size={hp('3.8%')} color="black" style={{opacity: 0.5}} />
              </TouchableOpacity>
            :
              <TouchableOpacity style={styles.notificationContainer} onPress={() => navigation.navigate('addarticle', {user: user})}>
                <MaterialIcons name="add" size={hp('3.8%')} color="black" style={{opacity: 0.5}} />
              </TouchableOpacity>
            }
          </View>

          <SearchBar placeholder='Search Articles...' onChange={val => search(val)} />

          <View>
            {show.map((item, key) => 
              <ArticleCard key={key} item={item} onPress={() => navigation.navigate('details', {article: item})} />
            )}
          </View>
      </ScrollView>
  );
}


const styles = StyleSheet.create({
  screen: {
    marginTop: StatusBar.currentHeight
  },

  header: {
    flexDirection: 'row',
    paddingVertical: hp('1.2%'),
    width: wp('90%'),
    alignSelf: 'center',
    alignItems: 'center'
  },

  pfp:{
    borderRadius: wp('50%'),
    width: wp('15%'),
    aspectRatio: 1
  },

  h1: {
    fontFamily: 'nunito_bold',
    fontSize: hp('3.6%'),
    color: '#94c037'
  },

  subtext: {
    opacity: 0.5,
    fontFamily: 'nunito',
    fontSize: hp('2.1%'),
    marginTop: -2
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

export default Articles;
