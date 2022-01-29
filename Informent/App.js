import React, {useState} from "react";
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";
import { LogBox } from "react-native";

//firebase
import firebase from 'firebase/compat/app'
import {firebaseConfig} from './static/firebaseConfig'

//Screens
import LoginStack from "./routes/LoginStack";


export default function App() {
	LogBox.ignoreLogs(['Setting a timer'])
	
	const [font, setFont] = useState(false);

	firebase.initializeApp(firebaseConfig)

	const loadFonts = async () => {
		await Font.loadAsync({
			dongle: require('./assets/fonts/Dongle-Regular.ttf'),
			nunito: require('./assets/fonts/Nunito-Medium.ttf'),
			nunito_bold: require('./assets/fonts/Nunito-Bold.ttf')
		})
	}

  	if (!font){
		return(
			<AppLoading 
				startAsync={loadFonts}
				onFinish={()=>{setFont(true)}}
				onError={e => console.warn(e)}
			/>
		)
	}

	return(
		<LoginStack />
	)
}