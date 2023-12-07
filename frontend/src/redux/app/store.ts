import { configureStore } from '@reduxjs/toolkit'
import { loginReducer } from '../features/Slices/loginSlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
    }

})



export default store;