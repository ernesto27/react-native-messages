import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
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
import { nanoid } from '@reduxjs/toolkit';
import { Message } from '../interfaces';


export const DetailMessageScreen = ({ route, navigation }) => {
  
    // navigation.setOptions({
    //   title: route.params.user,
    //   tabBarVisible: false
    // });

    const dispatch = useDispatch();
    const messages = useSelector(selectAllMessages)

    const messagesStatus = useSelector(state => state.messages.status );

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
                return ((i % 2 === 0) 
				  ? (<Text
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
				  : <Text 
					  	key={i}
				  		style={{
                      		backgroundColor: '#86f78c',
                      		width: '47%',
                      		alignSelf: 'flex-end',
                      		marginRight: 6,
                      		padding: 8, 
                      		borderRadius: 6    
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
                />
  
                <Button
                  style={{
                    marginRight: 7,
                    marginTop: 2,
                    padding: 2
                  }}
                  info
                  onPress={ () => {
                    const newMessage:Message = {
                    	userName: 'newuser',
                      	message: 'message from screen',
                      	uid: '777'
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