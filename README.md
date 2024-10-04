### Application Overview

**Name**: PSN Profile Manager

This is a frontend app that uses React and the specified technologies to consume [PSN API Server](https://github.com/junior-ramos-dev/psn_api_server) endpoints. This app will allow users to view their PlayStation profiles, track gaming statistics, and manage friend connections, all within a modern and responsive interface.

By utilizing technologies such as React, Redux Toolkit, Material-UI, and Axios, this app provides a smooth user experience, allowing users to view their gaming profiles, friends, and statistics effectively. The architecture allows for easy scalability and maintenance, making it an excellent choice for gamers looking to enhance their social experience in the PlayStation ecosystem.

### Features

1. **User Authentication**:
   - Users can log in to access their profiles and stats.

2. **Profile Overview**:
   - Display the user’s PSN profile, including their username, avatar, and gaming stats.

3. **[TODO] Friends List**:
   - View a list of friends and their gaming activities.

4. **Gaming Statistics**:
   - Visual representation of gaming statistics (e.g., hours played, trophies earned) using charts.

5. **Responsive Design**:
   - A mobile-friendly interface built with Material-UI.

### Tech Stack

- **React**: For building the user interface.
- **Redux Toolkit**: For managing global state.
- **Redux Persist**: For persisting the Redux state across sessions.
- **Axios**: For making API requests to the backend.
- **React Router DOM**: For client-side routing.
- **Emotion**: For CSS-in-JS styling.
- **Material-UI**: For UI components and design.
- **MUI/X Charts**: For displaying charts and graphs.
- **React Helmet**: For managing the document head.

### Application Architecture

1. **Pages**:
   - **Home**: Landing page with an overview of user stats.
   - **Game**: Detailed view of the user’s PSN games and trophies.
   - **Dashboard**: Detailed view using charts of the user’s PSN achievements stats.
   - **[TODO] Friends**: List of friends and their stats.

2. **Backend**:
   - **Express Server**: Handles routing and API requests.
   - **MongoDB**: Stores user profiles, linked PSN accounts, and other necessary data.
   - **PSN API Integration**: Connects to the PSN API to fetch user gaming data.

### Install and run the app with the following commands

- Make sure you have set up the **.env** file. See the **.env_example** file to check the required variables.

```bash
npm install

npm start
```

### Frontend Setup Description (Examples)
#### - Note: You can check the current setup in the repository


1. **Setup Redux Store**:
   - Create a folder structure: `/src/store`, `/src/slices`.

   ```typescript
   // src/store/store.ts
   import { configureStore } from '@reduxjs/toolkit';
   import { persistStore, persistReducer } from 'redux-persist';
   import storage from 'redux-persist/lib/storage';
   import rootReducer from './slices';

   const persistConfig = {
       key: 'root',
       storage,
   };

   const persistedReducer = persistReducer(persistConfig, rootReducer);

   const store = configureStore({
       reducer: persistedReducer,
   });

   const persistor = persistStore(store);

   export { store, persistor };
   ```

2. **Create Slices**:
   - For user data and PSN stats.

   ```typescript
   // src/slices/userSlice.ts
   import { createSlice, PayloadAction } from '@reduxjs/toolkit';

   interface UserState {
       username: string;
       avatar: string;
       psnId: string;
       gamingStats: any; // Adjust as needed
   }

   const initialState: UserState = {
       username: '',
       avatar: '',
       psnId: '',
       gamingStats: {},
   };

   const userSlice = createSlice({
       name: 'user',
       initialState,
       reducers: {
           setUser(state, action: PayloadAction<UserState>) {
               return action.payload;
           },
           clearUser(state) {
               return initialState;
           },
           setGamingStats(state, action: PayloadAction<any>) {
               state.gamingStats = action.payload;
           },
       },
   });

   export const { setUser, clearUser, setGamingStats } = userSlice.actions;
   export default userSlice.reducer;
   ```

3. **Create Axios Instance**:
   - For making API requests.

   ```typescript
   // src/api/axios.ts
   import axios from 'axios';

   const axiosInstance = axios.create({
       baseURL: 'http://your-api-url.com/api', // Replace with your backend URL
   });

   export default axiosInstance;
   ```

4. **Setup Routing**:
   - Configure routes using `react-router-dom`.

   ```typescript
   // src/App.tsx
   import React from 'react';
   import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
   import { Provider } from 'react-redux';
   import { PersistGate } from 'redux-persist/integration/react';
   import { store, persistor } from './store/store';
   import Home from './pages/Home';
   import Profile from './pages/Profile';
   import Friends from './pages/Friends';
   import Navbar from './components/Navbar';
   import { Helmet } from 'react-helmet';

   const App: React.FC = () => {
       return (
           <Provider store={store}>
               <PersistGate loading={null} persistor={persistor}>
                   <Router>
                       <Helmet>
                           <title>GameConnect</title>
                       </Helmet>
                       <Navbar />
                       <Routes>
                           <Route path="/" element={<Home />} />
                           <Route path="/profile" element={<Profile />} />
                           <Route path="/friends" element={<Friends />} />
                       </Routes>
                   </Router>
               </PersistGate>
           </Provider>
       );
   };

   export default App;
   ```
