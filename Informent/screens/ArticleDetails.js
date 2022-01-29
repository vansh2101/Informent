import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Text, ScrollView, StatusBar, Pressable} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import {Video} from 'expo-av';

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'


function ArticleDetails({route, navigation}) {
  const {article} = route.params

  const [step, setStep] = useState(1)
  const [media, setMedia] = useState(null)

  const video = useRef(null)
  const [status, setStatus] = useState({})
  const [vc, setVc] = useState(0)


  useEffect(() => {
      (
          async() => {
            if(article.video){
                const url = await firebase.storage().ref().child('articles/'+article.name).getDownloadURL()

                setMedia(url)
            }
          }
      )()
  }, [])

  return(
      <View style={{flex: 1}}>
        <ScrollView style={styles.screen}>

            <View style={{flexDirection: 'row', marginTop: hp('1.5%')}}>
                <Ionicons name="chevron-back-circle" size={hp('6.5%')} color="#94c037" style={styles.backBtn} onPress={() => navigation.goBack()} />
                <Text style={styles.h1}>{article.name}</Text>
            </View>

            {media ?
            <Video
                ref={video}
                style={styles.video}
                source={{
                uri: media,
                }}
                useNativeControls
                resizeMode="contain"
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            : <></>}

            <Text style={{...styles.h1, ...styles.step}}>Step {step}</Text>

            <Text style={styles.para}>{article.steps[step-1]}</Text>
        </ScrollView>

        {step !== 1 ?
        <Pressable style={{...styles.btn, left: 15}} onPress={() => setStep(step-1)}>
            <AntDesign name="caretleft" size={hp('5%')} color="black" />
        </Pressable>
        : <></>}

        {step !== article.steps.length ? 
        <Pressable style={{...styles.btn, right: 15}} onPress={() => setStep(step+1)}>
            <AntDesign name="caretright" size={hp('5%')} color="black" />
        </Pressable>
        :<></>}
      </View>
  );
}


const styles = StyleSheet.create({
    screen: {
        marginTop: StatusBar.currentHeight
    },

    h1: {
        fontFamily: 'nunito_bold',
        fontSize: hp('5%'),
        color: '#94c037',
        paddingHorizontal: 10,
    },

    step: {
        fontSize: hp('3.3%'),
        color: 'black',
        marginTop: hp('5%'),
        paddingHorizontal: 20
    },

    para: {
        fontFamily: 'nunito',
        fontSize: hp('2.5%'),
        width: wp('90%'),
        alignSelf: 'center',
        paddingLeft: 4,
        marginTop: hp('1%'),
        marginBottom: hp('3%'),
        opacity: 0.7
    },

    btn: {
        backgroundColor: '#94c037',
        width: wp('15%'),
        aspectRatio: 1,
        borderRadius: hp('50%'),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 15,
    },

    backBtn: {
        marginLeft: wp('3%')
    },

    video: {
        alignSelf: 'center',
        width: 350,
        height: 250,
        marginTop: hp('3%')
    },
})

export default ArticleDetails;
