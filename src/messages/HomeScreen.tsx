import React from "react";
import { useSelector } from 'react-redux'
import { Body, Container, Content, Left, List, ListItem, Right, Text, Thumbnail } from "native-base";


export const HomeScreen = ({ navigation }) => {
    const messages = useSelector(state => state.messages)

    return (
        <Container>
          <Content>
            <List>
              {messages.map((item, i:number) => { 
              return (
                <ListItem 
                  key={i} 
                  onPress={() => navigation.navigate({ name: 'Details', params: { user: 'Ernesto'} })}
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
              })}
            </List>
          </Content>
        </Container>
    );
}