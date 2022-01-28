import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


function ArticleCard({item, onPress}) {
  return(
      <TouchableOpacity style={styles.container} onPress={onPress}>
          <Image source={require('../assets/images/compost.jpg')} style={styles.img} />

          <View style={{paddingVertical: 5, paddingHorizontal: 8}}>
            <Text style={styles.heading}>{item.name}</Text>
            <Text style={styles.subtext}>-{item.author}</Text>

            <Text style={styles.para}>{item.description}</Text>
          </View>
      </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        marginVertical: hp('2%'),
        width: wp('90%'),
        alignSelf: 'center',
        elevation: 2,
        backgroundColor: 'white'
    },

    img: {
        borderRadius: 10,
        width: wp('90%')
    },

    heading: {
        fontFamily: 'nunito_bold',
        fontSize: hp('3%')
    },

    subtext: {
        opacity: 0.5,
        fontFamily: 'dongle',
        fontSize: hp('3.3%'),
        marginTop: -2,
        marginLeft: 5
    },

    para: {
        fontFamily: 'nunito',
        fontSize: hp('2%'),
        paddingHorizontal: 5,
        paddingVertical: 9,
        marginTop: -5
    }
})

export default ArticleCard;
