import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Articles from '../screens/Articles';
import AddArticle from '../screens/AddArticle';
import ArticleDetails from '../screens/ArticleDetails';


const Stack = createNativeStackNavigator();

function ArticleStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="article" component={Articles} />
          <Stack.Screen name="addarticle" component={AddArticle} />
          <Stack.Screen name="details" component={ArticleDetails} />
        </Stack.Navigator>
      );
}

export default ArticleStack;
