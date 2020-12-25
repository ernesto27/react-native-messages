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

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createStackNavigator();


const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Home" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}

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
  );
}