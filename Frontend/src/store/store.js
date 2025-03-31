import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import taskReducer from '../features/taskSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const taskPersistConfig = {
  key: 'tasks',
  storage,
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    tasks: persistReducer(taskPersistConfig, taskReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Non-Serializable Check Disable
    }),
});

export const persistor = persistStore(store);
export default store;
