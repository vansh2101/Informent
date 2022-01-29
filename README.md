# Informent
Information + Inform + Environment = Informent


## What it does
My app Informent, keeps people up to date on the different measures we can take to save environment. Different environmental organizations and NGOs can sign up on the app and publish articles and organize events to spread awareness and teach people about various environment related topics. People will gain credits as they do more and more events which they can redeem in the app shop to buy various things.

## How we built it
I have built it using `React Native` and its `Expo CLI` along with `Firebase` as a database and storage service. I have also used `Twilio` with a `NodeJS` backend to send users confirmation and informational messages.

## Setup
1) Create a firebase web based app in your firebase console and then add the `firebaseConfig` in `Informent/static/firebaseConfig.js`
2) Now, create a **twilio** account and then create a messaging service in **twilio dahboard**. Finally add a `.env` file in `api/` directory with `AUTHTOKEN`, `ACCOUNTSID` and `MESSAGINGSERVICESID` in it
3) run `npm i` separately in `api/` and `Informent/` directory.
4) Don't forget to change the api link in `Informent/screens/Success.js` to the link you are using your NodeJs server on.
5) Finally, `cd Informent` and `expo start`

**NOTE:** Make sure you have `expo` installed globally or in the `Informent/` directory
