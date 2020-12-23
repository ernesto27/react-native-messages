import * as React from 'react';
import { 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  StyleSheet,
  ScrollView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  Item, 
  Input, 
  Container, 
  Content, 
  List, 
  ListItem, 
  Left, 
  Body, 
  Right, 
  Thumbnail, 
  Text,
  Form,
  Button
} from 'native-base';


function DetailsScreen({ route, navigation }) {
  
  // navigation.setOptions({
  //   title: route.params.user,
  //   tabBarVisible: false
  // });

  return (
    <KeyboardAvoidingView 
      enabled 
      behavior={ Platform.OS === 'ios'? 'padding': null}
      style={{
        flexGrow: 1
      }}
    >
      <ScrollView 
        bounces= {false}
        style={{
          flex: 1
        }}
      >
        <View 
          style={{
        
          }}
        >
          <Content>
            {[...Array(12)].map((e, i) => { 
              return (<React.Fragment>
              <Text style={{
                backgroundColor: '#f5f5f5', 
                width: '47%', 
                padding: 8, 
                marginLeft: 4, 
                borderRadius: 6,
                marginTop: 4
              }}>
                Hola como estas todo bine?
              </Text>

              <Text style={{
                backgroundColor: '#86f78c',
                width: '47%',
                alignSelf: 'flex-end',
                marginRight: 6,
                padding: 8, 
                borderRadius: 6    
              }}>dfsfsdfsadfs dfadfsa afaf afa afa fd</Text></React.Fragment>)
            })}

          </Content>
        </View>

        <View style={{
            backgroundColor: 'white',
        }}>
          <Form>
            <Item>
              <Input 
                placeholder={"New message"}
              />

              <Button
                style={{
                  marginRight: 7,
                  marginTop: 2,
                  padding: 2
                }}
                info
              >
                <Text>Send</Text>
              </Button>
            </Item>
          </Form>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeTabs} />
        <HomeStack.Screen name="Details" component={DetailsScreen} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}