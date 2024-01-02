import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/Api/apiSlice';
import { persistReducer, persistStore } from 'redux-persist';
import { authSliceReducer } from '../features/Auth/authSlice';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key:'root',
    storage,
    whitelist: ['auth']
}

const rootReducer = combineReducers({
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth:authSliceReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: true
        }
    }).concat(apiSlice.middleware),
});

const persistor = persistStore(store);


export {store, persistor};
export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;