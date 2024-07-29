import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/authSlice";

import { gamesApi } from "./games/gamesApi";
import { authApi } from "./auth/authApi";
import { axiosBaseQuery } from "../services/axiosInstance";

const authPersistConfig = {
  key: "auth",
  storage,
  // whitelist: ["token"],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    [authApi.reducerPath]: authApi.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(gamesApi.middleware),

  devTools: process.env.NODE_ENV !== "production",
});

store.subscribe(axiosBaseQuery);
const persistor = persistStore(store);
export { store, persistor };

setupListeners(store.dispatch);

// export const store = configureStore({
//   reducer: {
//     // auth: authReducer,
//     user: userReducer,
//     [authApi.reducerPath]: authApi.reducer,
//     [gamesApi.reducerPath]: gamesApi.reducer,
//   },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//       .concat(authApi.middleware)
//       .concat(gamesApi.middleware),
//   devTools: process.env.NODE_ENV !== "production",
// });

// setupListeners(store.dispatch);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
