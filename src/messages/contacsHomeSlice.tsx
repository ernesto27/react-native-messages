import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

const initialState = {
  contacts: [],
  status: 'idle',
  error: null
}


// export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async() => {
//   console.log('FETCH CONTACTS')
//   let response = await fetch('https://reactnative.dev/movies.json');
//   let json = await response.json();
//   console.log(json.movies)
//   return json.movies;
// });

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async() => {
  const contacts = await firestore()
                  .collection('contacts')
                  .get();

  // TODO MAKE INTERFACE TYPESCRIPT
  const data = [];
  contacts.forEach(documentSnapshot => {
    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    data.push({
      username: documentSnapshot.data().username
    })
  });

  // return [
  //   {username: 'ernesto'}
  // ]
  return data;
});


const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchContacts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.contacts = state.contacts.concat(action.payload)
    },
    [fetchContacts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
});


export const selectAllContacts = state => state.contacts.contacts;

export default contactsSlice.reducer;