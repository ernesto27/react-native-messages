import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Item, Input, Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';


function DetailsScreen({ route, navigation }) {
  
  navigation.setOptions({
    title: route.params.user 
  });
  return (
    <Container>
      <Content>
          <View style={{backgroundColor: 'red', width: '30%', padding: 8, marginLeft: 4, borderRadius: 6}}>  
          <Text>Left</Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={{textAlign: 'right'}}>Solve This</Text>
          </View> 

          <View>  
          <Text>Left</Text>
          </View>
          
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'right'}}>Solve This</Text>
          </View> 

          <View>  
          <Text>Left</Text>
          </View>
          
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'right'}}>Solve This</Text>
          </View> 

          <View>  
          <Text>Left</Text>
          </View>
          
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'right'}}>Solve This</Text>
          </View> 

          <View>  
          <Text>Left</Text>
          </View>
          
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'right'}}>Solve This</Text>
          </View> 

          <View>  
          <Text>Left</Text>
          </View>
          
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'right'}}>Solve This</Text>
          </View> 

          <View>  
          <Text>Left</Text>
          </View>
          
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'right'}}>Solve This</Text>
          </View> 
        
        
      </Content>
    </Container>
  );
}

function HomeScreen({ navigation }) {
  return (
      <Container>
        <Content>
          <List>
            {[...Array(12)].map((e, i) => { 
            return (
              <ListItem 
                key={i} 
                onPress={() => navigation.navigate({ name: 'Details', params: { user: 'Ernesto'} })}
                avatar>
                <Left>
                  <Thumbnail source={{ uri: 'https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png' }} />
                </Left>
                <Body>
                  <Text>Kumar Pratik</Text>
                  <Text note>Doing what you like will always keep you happy . .</Text>
                </Body>
                <Right>
                  <Text note>3:43 pm</Text>
                </Right>
              </ListItem>)
            })}
          </List>
        </Content>
      </Container>
        // <Button
        //   title="Go to Details"
        //   onPress={() => navigation.navigate('Details')}
        // />
  );
}

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

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Chats" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Home" component={SettingsScreen} />
      {/* <SettingsStack.Screen name="Details" component={DetailsScreen} /> */}
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Chats" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}