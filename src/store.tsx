import { configureStore } from '@reduxjs/toolkit'

import messagesReducer from './messages/messagesSlice';
import contactsReducer from './messages/contacsHomeSlice';

export default configureStore({
  reducer: {
    messages: messagesReducer,
    contacts: contactsReducer
  },
});
