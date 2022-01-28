import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

function SearchBar({placeholder, onChange}) {
  return(
      <View style={styles.container}>
          <TextInput placeholder={placeholder} style={styles.input} onChangeText={onChange} />

          <Ionicons name="ios-search" size={26} color="black" style={styles.icon} />
      </View>
  );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(148, 192, 55, 0.45)',
        borderRadius: 15,
        width: wp('90%'),
        alignSelf: 'center',
        marginVertical: hp('1.8%'),
    },

    input: {
        flex: 1,
        padding: 10,
        fontFamily: 'nunito',
        fontSize: hp('2.3%'),
        paddingRight: 40,
        paddingLeft: 15
    },

    icon: {
        position: 'absolute',
        right: 13,
        top: 10,
        opacity: 0.4
    }
})

export default SearchBar;
