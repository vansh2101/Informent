import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//components
import Btn from '../components/Btn';
import InputBox from '../components/InputBox';
import DropDown from '../components/DropDown';


function AddEvent({route, navigation}) {
    const {user} = route.params
    const [type, setType] = useState();
    const [typeList, setTypeList] = useState([
        {name: 'plant'},
        {name: 'make'},
    ]);

    const [date, setDate] = useState();

    const [mode, setMode] = useState();
    const [modeList, setModeList] = useState([
      {name: 'In-Person'},
      {name: 'Virtual'},
  ]);

    const [name, setName] = useState()
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [description, setDescription] = useState()

    const addevent = () => {
      const db = firebase.firestore()

      db.collection('events').doc(name+'-'+user.email).set({
        type: type,
        mode: mode,
        name: name,
        date: date,
        description: description,
        host: user.name,
        email: user.email,
        location: user.city,
        people: 0,
        time: from + '-' + to,
        status: true
      })

      navigation.goBack()
      
    }

    return(
      <ScrollView style={styles.screen}>
          <Ionicons name="arrow-back-circle" size={hp('6.5%')} color="#94c037" style={styles.backbtn} onPress={() => navigation.goBack()} />

          <Text style={styles.heading}>Add Event</Text>
          <Text style={styles.subtext}>Please fill in the form to add a event.</Text>

          <DropDown 
            label='TYPE'
            placeholder='Select event type'
            value={type} 
            items={typeList}
            setValue={setType}
          />

          <InputBox label='NAME' placeholder='eg: john doe' onChangeText={setName} />

          <View style={{flexDirection: 'row', width: wp('90%'), alignSelf: 'center', justifyContent: 'space-between'}}>
            <InputBox
              label='DATE'
              placeholder='eg: 27/01/2022'
              onChangeText={setDate}
              style={{width: wp('42.5%')}}
              input={{width: wp('42.5%')}}
            />

            <DropDown
              label='MODE'
              placeholder='Select mode' 
              value={mode} 
              items={modeList} 
              setValue={setMode}
              style={{width: wp('42.5%')}}
            />
          </View>

          <View style={{flexDirection: 'row', width: wp('90%'), alignSelf: 'center', justifyContent: 'space-between'}}>
            <InputBox
              label='FROM'
              placeholder='eg: 10AM'
              onChangeText={setFrom}
              style={{width: wp('42.5%'), marginTop: hp('3%')}}
              input={{width: wp('42.5%')}}
            />

            <InputBox
              label='TO'
              placeholder='eg: 4PM'
              onChangeText={setTo}
              style={{width: wp('42.5%'), marginTop: hp('3%')}}
              input={{width: wp('42.5%')}}
            />
          </View>

          <InputBox label='DESCRIPTION' placeholder='Something about the event...' onChangeText={setDescription} multiline={true} style={{height: hp('15%')}} />

          <Btn text='Add Event' style={{paddingVertical: 7}} onPress={addevent} />

      </ScrollView>
    );
}


const styles = StyleSheet.create({
    screen: {
      marginTop: StatusBar.currentHeight,
    },

    heading: {
        fontFamily: 'nunito_bold',
        fontSize: hp('7%'),
        color: 'black',
        marginTop: hp('5%'),
        alignSelf: 'center'
    },

    subtext: {
        opacity: 0.5,
        fontFamily: 'nunito',
        fontSize: hp('2.3%'),
        alignSelf: 'center'
    },

    backbtn: {
      position: 'absolute',
      top: 12,
      left: 12
    }
});

export default AddEvent;