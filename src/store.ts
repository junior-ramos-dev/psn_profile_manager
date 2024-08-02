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
import storageSession from "redux-persist/lib/storage/session";

import { axiosBaseQuery } from "./services/rtkQueryApi/common/axiosBaseQuery";
import { rtkQueryBaseApi } from "./services/rtkQueryApi/common/rtkQueryBaseApi";

import authReducer from "./services/rtkQueryApi/auth/authSlice";
import gamesReducer from "./services/rtkQueryApi/games/gamesSlice";

const authPersistConfig = {
  key: "auth",
  storage: storageSession,
  // whitelist: ["token"],
};

const gamesPersistConfig = {
  key: "games",
  storage,
  // whitelist: ["token"],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    games: persistReducer(gamesPersistConfig, gamesReducer),
    [rtkQueryBaseApi.reducerPath]: rtkQueryBaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(rtkQueryBaseApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

store.subscribe(axiosBaseQuery);
const persistor = persistStore(store);
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
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
