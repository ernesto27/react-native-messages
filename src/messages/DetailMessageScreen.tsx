import React, { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { 
  Item, 
  Input,  
  Content,  
  Text,
  Form,
  Button
} from 'native-base';
import { useDispatch, useSelector } from "react-redux";
import { selectAllMessages, fetchMessages, AddMessage } from './messagesSlice';
import { Message } from '../interfaces';
import firebase from '@react-native-firebase/app';


export const DetailMessageScreen = ({ route, navigation }) => {
  
    // navigation.setOptions({
    //   title: route.params.user,
    //   tabBarVisible: false
    // });

    const dispatch = useDispatch();
    const messages = useSelector(selectAllMessages)
    const messagesStatus = useSelector(state => state.messages.status );


    const [textMessage, setMessage] = useState<string>('');

    useEffect(() => {
      if (messagesStatus === 'idle') {
        dispatch(fetchMessages());
      }
    }, [messagesStatus, dispatch])
  
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
              {messages.map((item:Message, i:number) => { 
                return ((item.uid === firebase.auth().currentUser?.uid) 
				  ? (<Text
              key={i}
              style={{
                backgroundColor: '#86f78c',
                width: '47%',
                alignSelf: 'flex-end',
                marginRight: 6,
                padding: 8, 
                borderRadius: 6,
                marginTop: 6    
              }} 
						  >
              {item.message}
            </Text>)

				  : <Text 
					  	key={i}
				  		style={{
                backgroundColor: '#f5f5f5', 
                width: '47%', 
                padding: 8, 
                marginLeft: 4, 
                borderRadius: 6,
                marginTop: 4
              }}>
                {item.message}
              </Text>)
          })}
  
            </Content>
          </View>
  
          <View style={{
              backgroundColor: 'white',
              marginTop: 4
          }}>
            <Form>
              <Item>
                <Input 
                  placeholder={"New message"}
                  onChangeText={(value) => setMessage(value)} 
                />
  
                <Button
                  style={{
                    marginRight: 7,
                    marginTop: 2,
                    padding: 2
                  }}
                  info
                  onPress={ () => {
                    let userName:string | null | undefined = '';
                    let uid:string | null | undefined = '';
                    if (firebase.auth().currentUser) {
                      userName = firebase.auth().currentUser?.displayName;
                      uid = firebase.auth().currentUser?.uid;
                    }
                    const newMessage:Message = {
                    	  userName: userName,
                      	message: textMessage,
                      	uid: uid
                    }
                    dispatch(AddMessage(newMessage))

                  }}
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