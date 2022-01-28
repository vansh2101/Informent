import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';


function DropDown({placeholder, label, items, value, setValue, style}) {
    const [open, setOpen] = useState(false)

    const onPress = item => {
        setValue(item)
        setOpen(false)
    }

    return(
        <View>
            <Pressable style={{...styles.container, ...style}} onPress={() => setOpen(!open)}>
                {value ? <Text style={{...styles.placeholder, opacity: 1}}>{value}</Text>
                : <Text style={styles.placeholder}>{placeholder}</Text> }
                <FontAwesome name="angle-down" size={hp('3.7%')} color="black" style={{position: 'absolute', right: wp('3%'), top: hp('1.5%'), opacity: 0.4}} />

                <Text style={styles.label}>{label}</Text>
            </Pressable>
            {open ? 
            <ScrollView style={{...styles.list, ...style}} nestedScrollEnabled={true}>
                {items.map((item, key) => 
                <TouchableOpacity onPress={() => onPress(item.name)} key={key}>
                    <Text style={styles.listItem}>{item.name}</Text>
                </TouchableOpacity>
                )}
            </ScrollView>
            :<></>}
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
        padding: 10,
        paddingVertical: 12
    },

    placeholder: {
        fontFamily: 'nunito',
        fontSize: hp('2.3%'),
        opacity: 0.4
    },

    label: {
        position: 'absolute',
        top: -16,
        left: 5,
        fontSize: hp('2%'),
        backgroundColor: '#ffffff',
        padding: 5,
        color: '#94c037',
        fontFamily: 'nunito',
    },

    list: {
        borderColor: '#94c037',
        borderWidth: 1,
        borderTopWidth: 0,
        width: wp('90%'),
        alignSelf: 'center',
        paddingHorizontal: 10,
        maxHeight: hp('27%'),
        position: 'absolute',
        top: hp('10.7%'),
        zIndex: 10000000,
        backgroundColor: 'white'
    },

    listItem: {
        fontSize: hp('2.15%'),
        paddingVertical: 7.5,
        fontFamily: 'nunito'
    }
})

export default DropDown;
