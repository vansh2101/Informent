import React, { useState } from 'react';
import { StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity, Image, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

//components
import Btn from '../components/Btn';
import InputBox from '../components/InputBox';


function AddArticle({route, navigation}) {
    const {user} = route.params

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()

    const [steps, setSteps] = useState([null])
    const [details, setDetails] = useState([])
    const [video, setVideo] = useState('')
    const [img, setImg] = useState('')
    const [loading, setLoading] = useState(false)

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
      setLoading(true)
      const db = firebase.firestore()

      const arr = details.filter(item => item !== undefined)

      await upload(video).then(() => console.log('video uploaded'))
      await upload(img, true).then(() => console.log('thumbnail uploaded'))

      try{
      var url = await firebase.storage().ref().child('images/'+title).getDownloadURL()
      }
      catch{
        console.log('error')
      }

      db.collection('articles').doc().set({
        author: user.name,
        email: user.email,
        name: title,
        description: description,
        steps: arr,
        video: video === '' ? false: true,
        img: url,
      })

      navigation.goBack()
      setLoading(false)
    }

    const pickVideo = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos
      });
  
      if (!result.cancelled) {
        setVideo(result.uri);
      }
    }

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      });
  
      if (!result.cancelled) {
        setImg(result.uri);
      }
    }

    const upload = async (uri, img=false) => {
      if (uri !== undefined){
        const response = await fetch(uri)
        const blob = await response.blob()

        let path;
        if (img) path = 'images/'+title
        else path = 'articles/'+title

        var ref = firebase.storage().ref().child(path)
        return ref.put(blob)
      }
    }

    if(loading){
      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../assets/images/loading.gif')} style={{aspectRatio: 1, height: hp('20%')}} />
          <Text style={{fontFamily: 'nunito'}}>Publishing Article</Text>
        </View>
      )
    }

    return(
      <ScrollView style={styles.screen}>
          <Ionicons name="arrow-back-circle" size={hp('6.5%')} color="#94c037" style={styles.backbtn} onPress={() => navigation.goBack()} />

          <Text style={styles.heading}>Add Article</Text>
          <Text style={styles.subtext}>Please fill in the form to add an article.</Text>

          <InputBox label='TITLE' placeholder='eg: my title' onChangeText={setTitle} />

          <InputBox label='DESCRIPTION' placeholder='Summary of the article...' onChangeText={setDescription} multiline={true} style={{height: hp('13%')}} />

          <InputBox label='THUMBNAIL' placeholder='Click to add a thumbnail image' editable={false} onPress={pickImage} value={video} />

          <InputBox label='VIDEO' placeholder='Click to add a demo video' editable={false} onPress={pickVideo} value={video} />

          {steps.map((item, key) => 
            <InputBox label={'STEP' + String(key+1)} placeholder='Step Details...' onChangeText={val => step_details(val,key)} multiline={true} style={{height: hp('18%')}} key={key} />
          )}

          <TouchableOpacity onPress={add_step}>
            <Text style={styles.btn}>Add Step +</Text>
          </TouchableOpacity>

          <Btn text='Add Article' style={{marginTop: hp('4%'), marginBottom: hp('3%')}} onPress={submit} />

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