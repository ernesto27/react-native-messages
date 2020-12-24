import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', userName: 'Ernesto', message: 'Hello!' },
  { id: '2', userName: 'Jose', message: 'Hello!' },
  { id: '3', userName: 'Luca', message: 'Hello!' },
  { id: '4', userName: 'Lautaro', message: 'Hello!' },
  { id: '5', userName: 'Timo', message: 'Hello!' },
  { id: '6', userName: 'Hany', message: 'Hello!' },
]

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {}
})

export default messagesSlice.reducer;