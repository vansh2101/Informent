import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

function Credit({value, style, iconSize=wp('3.5%'), iconStyle, textStyle}) {
  return(
      <View style={{flexDirection: 'row', ...style}}>
          <View style={{...styles.credit, ...iconStyle}}>
            <Ionicons name="leaf" size={iconSize} color="white" style={{marginLeft: 3}} />
          </View>
          <Text style={{...styles.value, ...textStyle}}>{value}</Text>
      </View>
  );
}


const styles = StyleSheet.create({
    credit: {
        width: wp('6.5%'),
        aspectRatio: 1,
        borderRadius: hp('50%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#94c037'
    },

    value: {
        fontFamily: 'dongle',
        fontSize: hp('4%'),
        marginLeft: 5,
        marginTop: -4
    }
})

export default Credit;
