import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Events from '../screens/Events';
import EventDetails from '../screens/EventDetails';
import Success from '../screens/Success';
import AddEvent from '../screens/AddEvent'


const Stack = createNativeStackNavigator();

function EventStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="events" component={Events} />
          <Stack.Screen name="eventdetails" component={EventDetails} />
          <Stack.Screen name="addevent" component={AddEvent} />
          <Stack.Screen name="success" component={Success} />
        </Stack.Navigator>
      );
}

export default EventStack;
