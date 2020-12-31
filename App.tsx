import * as React from 'react';
import { 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  Item, 
  Input,  
  Content,  
  Text,
  Form,
  Button
} from 'native-base';
import { Provider } from 'react-redux';
import store  from './src/store'
import { HomeScreen } from './src/messages/HomeScreen';
import { DetailMessageScreen } from './src/messages/DetailMessageScreen';
import { LoginScreen } from './src/login/LoginScreen';
import firebase from '@react-native-firebase/app';
import { useEffect, useState } from 'react';

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
      <Button
        onPress={() => {
          // Logout
          firebase.auth().signOut();
          //navigation.navigate('Login');
        }}>
          <Text>Logout</Text>
        </Button>
      
    </View>
  );
}

const HomeStack = createStackNavigator();


const SettingsStack = createStackNavigator();

function HomeTabs() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Chats" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();


export default function App() {

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    console.log('APP USE EFFECT');
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      console.log('User ', currentUser);
      setIsLogged(true);
    }
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStack.Navigator initialRouteName='Login'>
          <HomeStack.Screen name="Login" component={LoginScreen} />
          <HomeStack.Screen name="Home" component={HomeTabs} />
          <HomeStack.Screen name="Details" component={DetailMessageScreen} />
        </HomeStack.Navigator>
      </NavigationContainer>
    </Provider>

    // <Provider store={store}>
    //   <NavigationContainer>
    //     <HomeStack.Navigator>
    //       {isLogged === true ? (
    //         <>
    //         <HomeStack.Screen name="Home" component={HomeTabs} />
    //         <HomeStack.Screen name="Details" component={DetailMessageScreen} />
    //         </>
    //       ): (
    //         <HomeStack.Screen name="Login" component={LoginScreen} />
    //       )}
    //     </HomeStack.Navigator>
    //   </NavigationContainer>
    // </Provider>
  );
}