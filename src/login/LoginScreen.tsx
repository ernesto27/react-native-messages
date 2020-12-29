import React, { useEffect, useState } from "react";
import { Text } from "native-base";

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
    } from '@react-native-community/google-signin';

import auth from '@react-native-firebase/auth';
import { Alert, SegmentedControlIOSComponent } from "react-native";
import firebase from '@react-native-firebase/app';


export const LoginScreen = ({ navigation }) => {

    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);

    useEffect(() => {
        GoogleSignin.configure({
          webClientId: "427531867493-an7ekulu0aruuscb19pe9tsli3cf7tnt.apps.googleusercontent.com",
        });

        const user = firebase.auth().currentUser;

        if (user) {
          console.log('User ', user);
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Home',
              },
            ],
          })
        }
    }, []);

    var _signIn = async () => {

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
        
            console.log(userInfo)

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
            // navigation.navigate({ name: 'Home'});

            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Home',
                },
              ],
            })

          // Sign-in the user with the credential
          await auth().signInWithCredential(googleCredential);
        } catch (error) {
          alert('Error on google login');
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            alert('Cancel');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            alert('Signin in progress');
            // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            alert('PLAY_SERVICES_NOT_AVAILABLE');
            // play services not available or outdated
          } else {
            // some other error happened
            console.log('ERROR ON LOGIN')
          }
        }
    };

    var signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          setloggedIn(false);
          setuserInfo([]);
        } catch (error) {
          console.error(error);
        }
    };


    return (
        <Text 
            onPress={_signIn}
        >Do login</Text>
    )
}