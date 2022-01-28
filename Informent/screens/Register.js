import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//components
import Btn from '../components/Btn';
import InputBox from '../components/InputBox';
import DropDown from '../components/DropDown';

import {states, cities} from '../static/states'


function Register({navigation}) {
    const [account, setAccount] = useState();
    const [accountList, setAccountList] = useState([
        {name: 'Individual'},
        {name: 'Organization'},
    ]);

    const [city, setCity] = useState();
    const [cityList, setCityList] = useState([]);

    const [state, setState] = useState();
    const [stateList, setStateList] = useState(states);

    const [gender, setGender] = useState('');
    const [genderList, setGenderList] = useState([
        {name: 'Male'},
        {name: 'Female'},
        {name: 'Other'}
    ]);

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [age, setAge] = useState('')
    const [password, setPassword] = useState()
    const [cpass, setCpass] = useState()

    const citieslist = (item) => {
      setState(item)
      setCityList(cities.filter(city => city.state === item))
    }

    const signup = () => {
      if(password !== cpass){
        Alert.alert('Error', 'Passwords do not match')
        return
      }

      if(!name || !email || !phone || !address || !password || !city || !state || !account){
        Alert.alert('Empty Fields', 'Please fill in all the fields')
        return
      }

      if(account == 'Organization'){
        var data = {
          type: account,
          name: name,
          email: email,
          phone: phone,
          address: address,
          city: city,
          state: state
        }
      }
      else{
        var data = {
          type: account,
          name: name,
          email: email,
          phone: phone,
          address: address,
          city: city,
          state: state,
          gender: gender,
          age: age,
          credit: 0
        }
      }

      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
            console.log(data)
        })
        .catch(e => console.log(e));

      const db = firebase.firestore();
      db.collection('users')
        .doc(email)
        .set(data)
        .then(data => {
          navigation.navigate('login')
        })
    }

    return(
      <ScrollView style={styles.screen}>
          <Text style={{...styles.heading, color: '#94c037', marginTop: hp('0.5%')}}>New?</Text>
          <Text style={styles.heading}>Register now.</Text>
          <Text style={styles.subtext}>Welcome. Please fill in the form to sign up and continue</Text>

          <DropDown 
            label='ACCOUNT'
            placeholder='Select account type'
            value={account} 
            items={accountList}
            setValue={setAccount}
          />

          <InputBox label='NAME' placeholder='eg: john doe' onChangeText={setName} />
          <InputBox label='EMAIL' placeholder='eg: johndoe@gmail.com' onChangeText={setEmail} />
          <InputBox label='PHONE' placeholder='eg: 9034523523' onChangeText={setPhone} keyboard='numeric' />
          <InputBox label='ADDRESS' placeholder='eg: House No, Flat, Building' onChangeText={setAddress} />

          <View style={{flexDirection: 'row', width: wp('90%'), alignSelf: 'center', justifyContent: 'space-between'}}>
            <DropDown
              label='CITY'
              placeholder='Select city' 
              value={city} 
              items={cityList} 
              setValue={setCity}
              style={{width: wp('42.5%')}}
            />

            <DropDown
              label='STATE'
              placeholder='Select state' 
              value={state} 
              items={stateList} 
              setValue={citieslist}
              style={{width: wp('42.5%')}}
            />
          </View>

          {account === 'Individual' ?
          <>
          <InputBox label='AGE' placeholder='eg: 17' onChangeText={setAge} keyboard='numeric' />

          <DropDown 
            placeholder='Select your gender'
            label='GENDER' 
            value={gender} 
            items={genderList}
            setValue={setGender}
          />
          </>
            : <></>}

          <InputBox label='PASSWORD' placeholder='hushhh!! Its a secret...' onChangeText={setPassword} secure={true} />
          <InputBox label='CONFIRM PASSWORD' placeholder='It should match with the password' onChangeText={setCpass} secure={true} />

          <Btn text='Register' style={{marginTop: hp('5%')}} onPress={signup} />

          <Text style={styles.bottomText}>Already a User? <Text style={styles.link} onPress={() => navigation.goBack()}>Login Now</Text></Text>

      </ScrollView>
    );
}


const styles = StyleSheet.create({
    screen: {
      marginTop: StatusBar.currentHeight
    },

    heading: {
        fontFamily: 'nunito_bold',
        paddingLeft: wp('6%'),
        fontSize: hp('7%'),
        marginTop: -10,
        color: 'black'
    },

    subtext: {
        opacity: 0.5,
        fontFamily: 'nunito',
        fontSize: hp('2.3%'),
        paddingLeft: wp('7%'),
        paddingRight: wp('2%'),
    },

    account: {
        borderColor: '#94c037',
        width: wp('90%'),
        alignSelf: 'center',
        marginTop: hp('3%'),
        borderRadius: 0
    },

    bottomText: {
        alignSelf: 'center',
        marginTop: hp('2%'),
        fontSize: hp('2%'),
        opacity: 0.8,
        fontFamily: 'nunito',
        marginBottom: hp('3%')
    },

    link: {
        color: '#94c037',
        fontFamily: 'nunito_bold'
    }
});

export default Register;