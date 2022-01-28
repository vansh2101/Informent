import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Shop from '../screens/Shop';
import ItemDetails from '../screens/ItemDetails';
import Success from '../screens/Success';


const Stack = createNativeStackNavigator();

function ShopStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="shop" component={Shop} />
          <Stack.Screen name="item" component={ItemDetails} />
          <Stack.Screen name="success" component={Success} />
        </Stack.Navigator>
      );
}

export default ShopStack;
