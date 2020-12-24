import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// const initialState = [
//   { 
//       id: '1', 
//       userName: 'Ernesto', 
//       message: 'Hello!',
//       date: '' 
//   },
//   { id: '2', userName: 'Jose', message: 'Hello!' },
//   { id: '3', userName: 'Luca', message: 'Hello!' },
//   { id: '4', userName: 'Lautaro', message: 'Hello!' },
//   { id: '5', userName: 'Timo', message: 'Hello!' },
//   { id: '6', userName: 'Hany', message: 'Hello!' },
// ]

const initialState = {
  contacts: [],
  status: 'idle',
  error: null
}


export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async() => {
  console.log('FETCH CONTACTS')
  let response = await fetch('https://reactnative.dev/movies.json');
  let json = await response.json();
  console.log(json.movies)
  return json.movies;
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