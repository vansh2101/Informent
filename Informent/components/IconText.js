import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';

function IconText({icon, style, text, iconStyle, textStyle, iconSize=18}) {
  return(
    <View style={{flexDirection: 'row', ...style}}>
        <MaterialIcons name={icon} size={iconSize} color="black" style={{opacity: 0.5, ...iconStyle}} />
        <Text style={{...styles.details, ...textStyle}}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    details: {
        fontFamily: 'dongle',
        fontSize: hp('3%'),
        marginLeft: 5,
        opacity: 0.5,
        marginTop: -2
    },
})

export default IconText;
