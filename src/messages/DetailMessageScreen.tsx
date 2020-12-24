import React from "react";
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
import { addMessage } from './messagesSlice';
import { nanoid } from '@reduxjs/toolkit';

function renderText(item) {
  return <Text>From funcion</Text>
}

export const DetailMessageScreen = ({ route, navigation }) => {
  
    // navigation.setOptions({
    //   title: route.params.user,
    //   tabBarVisible: false
    // });

    const messages = useSelector(state => state.messages);
    console.log(messages)


    const items = messages;

    const dispatch = useDispatch();
  
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
              {items.map((item, i) => { 
                return ((i % 2 === 0) 
                  ? (<Text style={{
                        backgroundColor: '#f5f5f5', 
                        width: '47%', 
                        padding: 8, 
                        marginLeft: 4, 
                        borderRadius: 6,
                        marginTop: 4
                      }}>
                        {item.message}
                      </Text>)
                  : <Text style={{
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
                    //alert('Press')
                    dispatch(
                      addMessage({
                        id: nanoid(),
                        message: 'New message'
                      })
                    )

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