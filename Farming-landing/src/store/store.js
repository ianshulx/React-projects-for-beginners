import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from "redux";

import CustomizerReducer from './customizer/CustomizerSlice';

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// const rootReducer = combineReducers({
//   counter: counterReducer,
//   customizer: CustomizerReducer,
//   ecommerceReducer: EcommerceReducer,
//   chatReducer: ChatsReducer,
//   emailReducer: EmailReducer,
//   notesReducer: NotesReducer,
//   contactsReducer: ContactsReducer,
//   ticketReducer: TicketReducer,
//   userpostsReducer: UserProfileReducer,
//   blogReducer: BlogReducer,
// });
