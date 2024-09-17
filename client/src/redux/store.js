import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import headerEventsSlice from './headerEventsSlice';
import userAuthSlice from './userAuthSlice';
import postsSlice from './postsSlice';
import textsSlice from './textsSlice';
import publicationSlice from './publicationSlice';

const rootReducer = combineReducers({
  header: headerEventsSlice,
  user:userAuthSlice,
  posts:postsSlice,
  texts:textsSlice,
  publications:publicationSlice
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);