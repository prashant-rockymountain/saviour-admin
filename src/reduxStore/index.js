import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import { persistConfig } from "./allReduxConfigs";
import editDataSlice from "./editDataSlice";

const appReducer = combineReducers({
  userdata: loginSlice,
  alleditdata: editDataSlice,
});

const newrootReducer = (state, action) => {
  if (action.type === "logoutAllDataSlice/clearallstates") {
    state = {};
    localStorage.removeItem("persist:root");
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, newrootReducer);

const store = configureStore({
  reducer: {
    data: persistedReducer,
  },
  devTools: process.env.NODE_ENV === "development" ? true : false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER],
      },
    }),
});

const persistedStore = persistStore(store);

export { store, persistedStore };
