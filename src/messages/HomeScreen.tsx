import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Body, Container, Content, Item, Left, List, ListItem, Right, Text } from "native-base";
import { selectAllContacts, fetchContacts } from './contacsHomeSlice';


export const HomeScreen = ({ navigation }) => {
    // const messages = useSelector(state => state.contactsHome)

    const dispatch = useDispatch();
    const contacts = useSelector(selectAllContacts)

    const contactStatus = useSelector(state => state.contacts.status );

    useEffect(() => {
      if (contactStatus === 'idle') {
        dispatch(fetchContacts())
      }
    }, [contactStatus, dispatch])

    return (
        <Container>
          <Content>
            <List>
              {contacts.map((item, i) => { 
                return <Text>{item.title}</Text>
              })}
              {/* {messages.map((item, i:number) => { 
              return (
                <ListItem 
                  key={i} 
                  onPress={() =>  {
                    dispatch(contactsAdd({
                      
                        id: '1', 
                        userName: 'WALTER', 
                        message: 'Hello!',
                        date: '' 
                    
                    }))
                    navigation.navigate({ name: 'Details', params: { user: 'Ernesto'} })
                  }}
                  avatar>
                  <Left>
                    <Thumbnail source={{ uri: 'https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png' }} />
                  </Left>
                  <Body>
                    <Text>{item.userName}</Text>
                    <Text note>{item.message}</Text>
                  </Body>
                  <Right>
                    <Text note>3:43 pm</Text>
                  </Right>
                </ListItem>)
              })} */}
            </List>
          </Content>
        </Container>
    );
}