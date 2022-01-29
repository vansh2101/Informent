import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


function Success({route, navigation}) {
    const [play, setPlay] = useState(true)

    const {screen, text, sms, user} = route.params

    useEffect(() => {
        setTimeout(() => {
            setPlay(false)
        }, 3500)

        fetch('https://informent.herokuapp.com/sendsms', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({msg:sms, phone: '+91'+user.phone})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }, [])

  return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {play ? 
          <Image source={require('../assets/images/success.gif')} style={styles.img} />
          :
          <Image source={require('../assets/images/success.png')} style={styles.img} />
          }

          <Text style={styles.text}>{text}</Text>

          <TouchableOpacity onPress={() => navigation.navigate(screen)}>
              <Text style={styles.btn}>Back to {screen}</Text>
          </TouchableOpacity>
      </View>
  );
}


const styles = StyleSheet.create({
    img: {
        height: hp('25%'),
        aspectRatio: 1
    },

    text: {
        width: wp('80%'),
        textAlign: 'center',
        marginTop: hp('3%'),
        fontFamily: 'nunito',
        fontSize: hp('2.2%')
    },

    btn: {
        color: '#49b848',
        fontFamily: 'nunito',
        fontSize: hp('3%'),
        marginTop: hp('5%')
    }
})

export default Success;
