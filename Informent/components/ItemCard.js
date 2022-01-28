import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//components
import Credit from './Credit';

function ItemCard({name, price, onPress}) {
  return(
      <TouchableOpacity style={styles.container} onPress={onPress}>
          <Image source={require('../assets/images/plant.png')} style={styles.img} />
          <Text style={styles.heading}>{name}</Text>
          <Credit value={price} />
      </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        marginVertical: hp('1.5%'),
        width: wp('42%'),
        elevation: 2,
        backgroundColor: 'white',
        padding: 10
    },

    img: {
        aspectRatio: 1,
        height: hp('18%'),
        marginBottom: hp('1%')
    },

    heading: {
        fontFamily: 'nunito_bold',
        fontSize: hp('2.8%'),
        marginBottom: hp('0.8%'),
        paddingLeft: 5
    },
})

export default ItemCard;
