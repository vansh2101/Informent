import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//components
import Btn from '../components/Btn';
import InputBox from '../components/InputBox';

function Login({navigation}) {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signin = () => {
        if(email == '') return

        setLoading(true)
        firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(data => {
            AsyncStorage.setItem('session', data.user.email).then(data => {
                setEmail('')
                setPassword('')
                navigation.navigate('home')
                setLoading(false)
            })
        })
        .catch(e => {
            setEmail('')
            setPassword('')
            if (e.code === 'auth/invalid-email') Alert.alert("Email Invalid", 'Please enter a correct email')
            else if (e.code === 'auth/internal-error') Alert.alert("Password Invalid", 'Please enter a password')
            else if (e.code === 'auth/wrong-password') Alert.alert("Wrong Password", 'Password Incorrect')
            else if (e.code === 'auth/user-not-found') Alert.alert("User does not exist", 'User with entered email id does not exist')
            setEmail('')
            setPassword('')
            setLoading(false)
        })
    }

  if(loading){
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../assets/images/loading.gif')} style={{aspectRatio: 1, height: hp('20%')}} />
        </View>
    )
  }

  return(
      <View style={styles.screen}>
          <Text style={{...styles.heading, color: '#94c037'}}>Hello,</Text>
          <Text style={styles.heading}>Login now.</Text>
          <Text style={styles.subtext}>Welcome back. Please fill in the form to sign in and continue</Text>


          <InputBox label='EMAIL' placeholder='eg: johndoe@gmail.com' onChangeText={val => setEmail(val)} />
          <InputBox label='PASSWORD' placeholder='hushhh!! Its a secret...' onChangeText={val => setPassword(val)} secure={true} />

          <Btn text='Login' style={{marginTop: hp('5%')}} onPress={signin} />

          <Text style={styles.bottomText}>New User? <Text style={styles.link} onPress={() => navigation.navigate('register')}>Register Now</Text></Text>

          <StatusBar style='auto' />
      </View>
  );
}


const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
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
        marginBottom: hp('3%')
    },

    bottomText: {
        alignSelf: 'center',
        marginTop: hp('2%'),
        fontSize: hp('2%'),
        opacity: 0.8,
        fontFamily: 'nunito'
    },

    link: {
        color: '#94c037',
        fontFamily: 'nunito_bold'
    }
});

export default Login;