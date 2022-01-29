import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, StatusBar, Image, Dimensions, Pressable} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//components
import IconText from '../components/IconText';
import Btn from '../components/Btn';

function EventDetails({route, navigation}) {
  const {item, user} = route.params;

  const [already, setAlready] = useState(false)
  const [people, setPeople] = useState([])

  const db = firebase.firestore()

  useEffect(() => {
      (
          async() => {
              const obj = await db.collection('events').doc(item.name+'-'+item.email).collection('people').get()

              obj.forEach(doc => {
                setPeople(current => {
                    return [doc.data(), ...current]
                })

                if (doc.data().email == user.email){
                    setAlready(true)
                }
              })
          }
      )()
  }, [])

  const apply = async () => {
      await db.collection('events').doc(item.name+'-'+item.email).collection('people').doc(user.email).set({
          email: user.email,
          name: user.name,
          phone: user.phone,
          age: user.age,
          gender: user.gender,
          city: user.city,
          state: user.state,
          credit: user.credit
      })

      await db.collection('events').doc(item.name+'-'+item.email).update({people: item.people +1})

      navigation.navigate('success', {
          screen: 'events', 
          text: 'Successfully signed up for this event.',
          sms: `You have successfully signed up for ${item.name}. Hope you have fun in this event.`,
          user: user
        })
  }

  const end = async () => {
      await db.collection('events').doc(item.name+'-'+item.email).update({status: false})

      let give;
      if (item.mode == 'Virtual'){
          give = 10
      }
      else{
          give = 20
      }

      people.forEach(async (user) => {
          await db.collection('users').doc(user.email).update({credit: user.credit + give})
      })

      navigation.navigate('success', {
          screen: 'events', 
          text: 'Event ended. The credits would be given to the volunteers shortly.',
          sms: `${item.name} has been ended. Hope you had fun in this event.`,
          user: user
        })
  }

  return(
      <View>
        <ScrollView style={{height: Dimensions.get('screen').height * 0.8, position: 'relative'}}>
            <StatusBar barStyle='light-content' />

            <View>
                {item.type == 'make' ? <Image source={require('../assets/images/eventbg1.png')} style={styles.img} />
                : <Image source={require('../assets/images/eventbg.png')} style={styles.img} />}

                <Ionicons name="chevron-back-circle" size={hp('7%')} color="#94c037" style={styles.backBtn} onPress={() => navigation.goBack()} />
            </View>

            <View style={styles.main}>
                <Text style={styles.h1}>{item.name}</Text>
                <Text style={styles.subtext}>Hosted by {item.host}</Text>

                <View style={{marginTop: 10}}>

                    <View style={styles.flexbox}>
                        <IconText icon='date-range' text={item.date} />
                        <IconText icon='computer' text={item.mode} />
                    </View>

                    <View style={styles.flexbox}>
                        <IconText icon='location-pin' text={item.location} />
                        <IconText icon='person' text={item.people} />
                    </View>

                    <IconText icon='access-time' text={item.time} />

                </View>

                <View style={{marginTop: 10}}>
                    <Text style={{...styles.h1, fontSize: hp('2.8%'), opacity: 0.75}}>Description</Text>

                    <Text style={styles.para}>
                    {item.description}
                    </Text>
                </View>

            </View>
        </ScrollView>

        {user.type == 'Individual' ?
        already ?
        <Btn text='Applied' style={{marginTop: 7, paddingVertical: 8}} />
        :
        <Btn text='Apply Now' style={{marginTop: 7, paddingVertical: 8}} onPress={apply} />
        :
        <Btn text='End Event' style={{marginTop: 7, paddingVertical: 8}} onPress={end} />
        }
      </View>
  );
}


const styles = StyleSheet.create({
    backBtn: {
        position: 'absolute',
        top: StatusBar.currentHeight + 10,
        left: 10,
    },

    img: {
        height: wp('90%'),
        width: wp('100%'),
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },

    main: {
        width: wp('90%'),
        alignSelf: 'center'
    },

    h1: {
        fontFamily: 'nunito_bold',
        fontSize: hp('4%'),
        marginTop: hp('1%')
    },

    subtext: {
        opacity: 0.6,
        fontFamily: 'nunito',
        fontSize: hp('2%'),
        marginLeft: 3,
        marginBottom: hp('0.8%')
    },

    flexbox: {
        flexDirection: 'row',
        width: wp('60%'),
        justifyContent: 'space-between'
    },

    para: {
        fontFamily: 'nunito',
        fontSize: hp('2%'),
        marginBottom: hp('2%'),
        opacity: 0.6
    }
})

export default EventDetails;
