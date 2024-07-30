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

import authReducer from "../../services/rtkQueryApi/auth/authSlice";
import gamesReducer from "../../services/rtkQueryApi/games/gamesSlice";

import { gamesApi } from "../../services/rtkQueryApi/games/gamesApi";
import { authApi } from "../../services/rtkQueryApi/auth/authApi";
import { axiosBaseQuery } from "../../services/rtkQueryApi/axiosBaseQuery";

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

//TODO Verify usage of combinedReducers
// const rootReducer = combineReducers({
//   auth: persistReducer(authPersistConfig, authReducer),
//   games: gamesReducer,
// });

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    games: persistReducer(gamesPersistConfig, gamesReducer),
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
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
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
