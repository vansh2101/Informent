import * as React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


//screens
import Profile from '../screens/Profile';
import EventStack from './EventStack';
import ShopStack from './ShopStack';
import ArticleStack from './ArticleStack'


const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
            let iconName;

            if (route.name === 'Home') {
                iconName = 'home';
            }
            else if (route.name === 'Events'){
                iconName = 'leaf'
            }
            else if (route.name === 'Shop'){
                iconName = 'cart'
            }
            else if (route.name === 'Profile'){
                iconName = 'person-circle-outline'
            }

            return(
              focused ?
                <View style={{marginTop: 3}}>
                  <Ionicons name={iconName} size={26} color={color} />

                  <View style={{backgroundColor: '#94c037', padding: 1.3, marginTop: 5, borderTopLeftRadius: 7, borderTopRightRadius: 7}}></View>
                </View>
                :
                  <Ionicons name={iconName} size={25} color={color} />
            )
        },

        tabBarActiveTintColor: '#94c037',
        tabBarInactiveTintColor: 'rgba(0,0,0,0.4)',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle:{
            elevation: 5,
            borderTopWidth: 0
        }
    })}
    >
      <Tab.Screen name="Home" component={ArticleStack} />
      <Tab.Screen name="Events" component={EventStack} />
      <Tab.Screen name="Shop" component={ShopStack} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}


export default Tabs