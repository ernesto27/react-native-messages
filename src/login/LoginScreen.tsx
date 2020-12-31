import React, { useEffect, useState } from "react";
import { Text } from "native-base";

import {
    GoogleSignin,
    statusCodes,
    } from '@react-native-community/google-signin';

import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';


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
    
        console.log('userInfo', userInfo)

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
        await auth().signInWithCredential(googleCredential);

        const user = firebase.auth().currentUser;
        console.log('Firebase user', user);

        // Check if users exists on Firestore DB
        const usersExists = await firestore()
                            .collection('users')
                            .where('uid', '==', user?.uid);
                            

        usersExists.get().then(function(querySnapshot) {
          if(querySnapshot.empty) {
            console.log('Create new user on firestore');
            firestore()
            .collection('users')
            .add({
              name: auth().currentUser?.displayName,
              uid: auth().currentUser?.uid
            })
            .then(() => {
              console.log('User added!');
                  navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'Home',
                      },
                    ],
                  })
            })
            .catch((error) => {
              console.log(error);
              alert(error); 

            });
          } else {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Home',
                },
              ],
            })
          }
        })
        .catch(function(error) {
          console.log(error);
          alert(error); 
        });
        // Sign-in the user with the credential
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