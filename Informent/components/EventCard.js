import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';

//components
import IconText from './IconText';


function EventCard({item, onPress}) {
  return(
      <TouchableOpacity style={styles.container} onPress={onPress}>
          {item.type === 'make' ? <Image source={require('../assets/images/events1.png')} style={styles.img} />
          : <Image source={require('../assets/images/events.png')} style={styles.img} />}

          <View style={{paddingHorizontal: 10, width: wp('57%')}}>
              <Text style={styles.heading}>{item.name}</Text>

              <View style={styles.flexbox}>
                <IconText icon='date-range' text={item.date} />
                <IconText icon='computer' text={item.mode} />
              </View>

              <View style={styles.flexbox}>
                <IconText icon='location-pin' text={item.location} />
                <IconText icon='person' text={item.people} />
              </View>

          </View>
      </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        marginVertical: hp('1.5%'),
        width: wp('90%'),
        alignSelf: 'center',
        elevation: 2,
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center'
    },

    img: {
        aspectRatio: 1,
        width: wp('28%'),
    },

    heading: {
        fontFamily: 'nunito_bold',
        fontSize: hp('2.8%'),
        marginBottom: hp('0.8%')
    },

    details: {
        fontFamily: 'dongle',
        fontSize: hp('3%'),
        marginLeft: 5,
        opacity: 0.5,
        marginTop: -2
    },

    flexbox: {
        flexDirection: 'row',
        width: wp('50%'),
        justifyContent: 'space-between'
    }
})

export default EventCard;
