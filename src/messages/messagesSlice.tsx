import { createSlice } from '@reduxjs/toolkit'



var initialState = [
        {
            id: 'xxxx',
            userName: 'ernesto',
            message: 'Ernesto 100 message'
        },
        {
            id: 'xxxx',
            userName: 'luca',
            message: 'Luca 1 message'
        },
        {
            id: 'xxxx',
            userName: 'ernesto',
            message: 'Ernesto 2 message'
        },
        {
            id: 'xxxx',
            userName: 'luca',
            message: 'Luca 2 message'
        },
        {
            id: 'xxxx',
            userName: 'ernesto',
            message: 'Ernesto 2 message'
        },
        {
            id: 'xxxx',
            userName: 'luca',
            message: 'Luca 2 message'
        },
        {
            id: 'xxxx',
            userName: 'ernesto',
            message: 'Ernesto 2 message'
        },
        {
            id: 'xxxx',
            userName: 'luca',
            message: 'Luca 2222 message'
        }
    ];


const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
      addMessage(state, action) {
          console.log('ADD MESSAGE');
          state.push(action.payload)
      }
  }
});


export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;













