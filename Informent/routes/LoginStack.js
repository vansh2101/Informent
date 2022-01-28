import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Login from '../screens/Login';
import Register from '../screens/Register';

import Tabs from './Tabs';


const Stack = createNativeStackNavigator();

function LoginStack() {
    return (
        <NavigationContainer theme={{...DefaultTheme, colors: {...DefaultTheme.colors, background: 'white'}}}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="home" component={Tabs} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}

export default LoginStack;
