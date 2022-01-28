import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//components
import Btn from '../components/Btn';
import InputBox from '../components/InputBox';


function AddArticle({route, navigation}) {
    const {user} = route.params

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()

    const [steps, setSteps] = useState([null])
    const [details, setDetails] = useState([])

    const [image, setImage] = useState();

    const step_details = (val, pos) => {
      const arr = details
      arr[pos] = val
      
      setDetails(arr)
    }

    const add_step = () => {
      setSteps(prev => {
        return [...prev, null]
      })
    }

    const submit = async () => {
      const db = firebase.firestore()

      const arr = details.filter(item => item !== undefined)

      
      db.collection('articles').doc().set({
        author: user.name,
        email: user.email,
        name: title,
        description: description,
        steps: arr
      })

      navigation.goBack()
      
    }

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All
      });
  
      if (!result.cancelled) {
        setImage(result.uri);
        upload(result.uri).then(() => console.log('success')).catch(err => console.log(err))
      }
    }

    const upload = async (uri) => {
      const response = await fetch(uri)
      const blob = await response.blob()

      var ref = firebase.storage().ref().child('images/test-image')
      return ref.put(blob)
    }

    return(
      <ScrollView style={styles.screen}>
          <Ionicons name="arrow-back-circle" size={hp('6.5%')} color="#94c037" style={styles.backbtn} onPress={() => navigation.goBack()} />

          <Text style={styles.heading}>Add Article</Text>
          <Text style={styles.subtext}>Please fill in the form to add an article.</Text>

          <InputBox label='TITLE' placeholder='eg: my title' onChangeText={setTitle} />

          <InputBox label='DESCRIPTION' placeholder='Summary of the article...' onChangeText={setDescription} multiline={true} style={{height: hp('13%')}} />

          {steps.map((item, key) => 
            <InputBox label={'STEP' + String(key+1)} placeholder='Step Details...' onChangeText={val => step_details(val,key)} multiline={true} style={{height: hp('18%')}} key={key} />
          )}

          <TouchableOpacity onPress={add_step}>
            <Text style={styles.btn}>Add Step +</Text>
          </TouchableOpacity>

          <Btn text='Add Article' style={{marginTop: hp('5%')}} onPress={submit} />

          <Btn text='Image' style={{marginTop: hp('5%')}} onPress={pickImage} />

      </ScrollView>
    );
}


const styles = StyleSheet.create({
    screen: {
      marginTop: StatusBar.currentHeight,
    },

    heading: {
        fontFamily: 'nunito_bold',
        fontSize: hp('6.8%'),
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
      top: 10,
      left: 12
    },

    btn: {
      fontFamily: 'nunito_bold',
      fontSize: hp('2.3%'),
      width: wp('88%'),
      alignSelf: 'center',
      marginTop: hp('2%'),
      color: '#94c037'
    }
});

export default AddArticle;