// store/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from "./slices/userSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


// Root reducer
const rootReducer = combineReducers({
  user: userReducer,
});


// Persist config
const persistConfig = {
  key: 'root',
  storage,
};

// Wrap reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // redux-persist uses non-serializable values
      }),
  });
};

// ✅ Types for the store, state, and dispatch
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;

// Export persistor type
export type Persistor = ReturnType<typeof persistStore>;
