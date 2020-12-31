import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Body, Container, Content, Item, Left, List, ListItem, Right, Text, Thumbnail } from "native-base";
import { selectAllContacts, fetchContacts } from './contacsHomeSlice';
import { Contact } from '../interfaces';
import firebase from '@react-native-firebase/app';

export const HomeScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const contacts = useSelector(selectAllContacts)

    const contactStatus = useSelector(state => state.contacts.status );

    useEffect(() => {
      if (contactStatus === 'idle') {
        dispatch(fetchContacts());
      }
      
      const user = firebase.auth().currentUser;

      if (user) {
        console.log('User ', user);
      }
    }, [contactStatus, dispatch])

    return (
        <Container>
          <Content>
            <List>
              {contacts.map((item:Contact, i:number) => { 
              return (
                <ListItem 
                  key={i} 
                  onPress={() =>  {
                    navigation.navigate({ name: 'Details', params: { user: 'Ernesto'} })
                  }}
                  avatar>
                  <Left>
                    <Thumbnail source={{ uri: 'https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png' }} />
                  </Left>
                  <Body>
                    <Text>{item.userName}</Text>
                    <Text note>{item.lastMessage}</Text>
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