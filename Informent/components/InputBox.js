import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function InputBox({placeholder, label, onChangeText, secure=false, keyboard='default', style, multiline=false, input}) {
  return(
      <View style={{...styles.container, ...style}}>
        <TextInput style={{...styles.input, ...input}} onChangeText={onChangeText} secureTextEntry={secure} placeholder={placeholder} keyboardType={keyboard} multiline={multiline} />
        <Text style={styles.label}>{label}</Text>
      </View>
  );
}


const styles = StyleSheet.create({
    container: {
        width: wp('90%'),
        alignSelf: 'center',
        borderColor: '#94c037',
        borderWidth: 1,
        marginTop: hp('4%'),
        position: 'relative',
    },

    input: {
        width: wp('90%'),
        padding: 10,
        fontFamily: 'nunito',
        fontSize: hp('2.3%'),
    },

    label: {
        position: 'absolute',
        top: -16,
        left: 5,
        fontSize: hp('2%'),
        backgroundColor: '#ffffff',
        padding: 5,
        color: '#94c037',
        fontFamily: 'nunito'
    }
})

export default InputBox;