import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { Message } from '../interfaces';


const initialState = {
	messages: [],
  	status: 'idle',
  	error: null
}

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async() => {
    const messages = await firestore()
                            .collection('messages')
                            .get();

    console.log('FETCH MESSAGES');
    const data:Message[] = [];
    messages.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        data.push({
            userName: documentSnapshot.data().userName,
            message: documentSnapshot.data().message,
            uid: documentSnapshot.data().uid
        });
    });

    return data;
});


export const AddMessage = createAsyncThunk('messages/AddMessage', async data => {
    console.log(data)
    const newMessage = await firestore()
                        .collection(data.uid + '-' + data.uid )
                        .add(data)
    
    console.log(newMessage);
    return data;
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMessages.pending]: (state, action) => {
          state.status = 'loading';
    },
    [fetchMessages.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.messages = state.messages.concat(action.payload);
    },
    [fetchMessages.rejected]: (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
    },

    [AddMessage.fulfilled]: (state, action) => {
        console.log(action.payload)
        state.messages.push(action.payload)
    }
  }
});


export const selectAllMessages = state => state.messages.messages;

export default messagesSlice.reducer;













