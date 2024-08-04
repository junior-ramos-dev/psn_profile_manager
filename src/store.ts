import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import authReducer from "./services/rtkQueryApi/auth/authSlice";
import { axiosBaseQueryApi } from "./services/rtkQueryApi/base/axiosBaseQueryApi";
import { rtkQueryBaseApi } from "./services/rtkQueryApi/base/rtkQueryBaseApi";
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

store.subscribe(axiosBaseQueryApi);
const persistor = persistStore(store);
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export { persistor,store };

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
