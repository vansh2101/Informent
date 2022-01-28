import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function Btn({text, style, onPress}) {
  return(
    <TouchableOpacity style={{...styles.btn, ...style}} onPress={onPress}>
        <Text style={styles.txt}>{text}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#94c037',
        width: wp('89%'),
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        elevation: 4,
        marginTop: hp('2.3%'),
        alignSelf: 'center'
    },

    txt: {
        color: '#ffffff',
        fontFamily: 'dongle',
        fontSize: hp('3.7%'),
        marginTop: 3
    }
})

export default Btn;