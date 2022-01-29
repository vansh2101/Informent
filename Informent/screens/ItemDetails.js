import React from 'react';
import {StyleSheet, View, ScrollView, Text, StatusBar, Dimensions, Image, Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//components
import Btn from '../components/Btn';
import Credit from '../components/Credit'


function ItemDetails({route, navigation}) {
  const {item, user} = route.params

  const confirm = () => {
      if(user.credit < item.price){
          Alert.alert('Invalid Purchase', 'You don\'t have enough credits to buy this product')
          return
      }
      Alert.alert(
          'Confirmation',
          `Are you sure you want to buy ${item.name} for ${item.price} credits?`,
          [
              {
                  text: 'No',
              },
              {
                  text: 'Yes',
                  onPress: buy
              }
          ]
      )
  }

  const buy = async () => {
      const db = firebase.firestore()

      const date = new Date()
      const month = date.getMonth()
      const year = date.getFullYear()
      const today = date.getDate()

      await db.collection('users').doc(user.email).collection('orders').doc().set({
          item: item.name,
          price: item.price,
          date: String(today) + '/' + String(month + 1)+ '/' + String(year)
      })

      await db.collection('users').doc(user.email).update({credit: user.credit-item.price})

      navigation.navigate('success', {
        screen: 'shop',
        text: 'Your Order has been placed successfully. The item will be delivered to your address within 7 working days.',
        sms: `Your order of ${item.name} has been placed successfully. The order would be deliverd to ${user.address} within 5-7 working days. Thankyou for using our service.`,
        user: user
      })
  }

  return(
    <View>
        <ScrollView style={{height: Dimensions.get('screen').height * 0.8}}>
            <StatusBar barStyle='light-content' />

            <View style={styles.top}>
                <Ionicons name="chevron-back-circle" size={hp('7%')} color="#94c037" style={styles.backBtn} onPress={() => navigation.goBack()} />
            </View>
            <Image source={{uri: item.img}} style={styles.img} />

            <View style={{width: wp('90%'), alignSelf: 'center'}}>
                <Text style={styles.h1}>{item.name}</Text>
                <Credit value={item.price} />

                <View style={{marginTop: 10}}>
                    <Text style={{...styles.h1, fontSize: hp('2.8%'), opacity: 0.75}}>Description</Text>

                    <Text style={styles.para}>
                    {item.description}
                    </Text>
                </View>
            </View>

        </ScrollView>

        <Btn text='Buy Now' style={{marginTop: 7, paddingVertical: 8}} onPress={confirm} />
    </View>
  );
}


const styles = StyleSheet.create({
    top: {
        backgroundColor: 'rgba(148, 192, 55, 0.3)',
        height: hp('40%'),
        overflow: 'visible'
    },

    backBtn: {
        position: 'absolute',
        top: StatusBar.currentHeight + 10,
        left: 10,
    },

    img: {
        aspectRatio: 1,
        height: hp('45%'),
        alignSelf: 'center',
        marginTop: hp('-30%'),
    },

    h1: {
        fontFamily: 'nunito_bold',
        fontSize: hp('4%'),
        marginVertical: hp('1%')
    },

    para: {
        fontFamily: 'nunito',
        fontSize: hp('2%'),
        marginBottom: hp('2%'),
        opacity: 0.6
    }
})

export default ItemDetails;
