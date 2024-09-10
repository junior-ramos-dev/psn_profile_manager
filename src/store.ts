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

import { axiosBaseQueryApi } from "./services/axios/axiosBaseQueryApi";
import authReducer from "./services/rtkQueryApi/auth/authSlice";
import gameReducer from "./services/rtkQueryApi/game/gameSlice";
import { rtkQueryBaseApi } from "./services/rtkQueryApi/rtkQueryBaseApi";
import userProfileReducer from "./services/rtkQueryApi/user/userProfileSlice";
import { IS_NOT_NODE_ENV_PRODUCTION } from "./utils/env";

const authPersistConfig = {
  key: "auth",
  storage: storageSession,
  // whitelist: ["token"],
};

const userProfilePersistConfig = {
  key: "user",
  storage: storageSession,
  // whitelist: ["token"],
};

const gamePersistConfig = {
  key: "game",
  storage,
  // whitelist: ["token"],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    user: persistReducer(userProfilePersistConfig, userProfileReducer),
    game: persistReducer(gamePersistConfig, gameReducer),
    [rtkQueryBaseApi.reducerPath]: rtkQueryBaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(rtkQueryBaseApi.middleware),
  devTools: IS_NOT_NODE_ENV_PRODUCTION,
});

store.subscribe(axiosBaseQueryApi);
const persistor = persistStore(store);
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export { persistor, store };

setupListeners(store.dispatch);

// export const store = configureStore({
//   reducer: {
//     // auth: authReducer,
//     user: userProfileReducer,
//     [authApi.reducerPath]: authApi.reducer,
//     [gameApi.reducerPath]: gameApi.reducer,
//   },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//       .concat(authApi.middleware)
//       .concat(gameApi.middleware),
//   devTools: IS_NOT_NODE_ENV_PRODUCTION,
// });

// setupListeners(store.dispatch);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
