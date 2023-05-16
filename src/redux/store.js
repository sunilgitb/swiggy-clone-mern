import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import searchReducer from './slice/searchSlice';
import authReducer from './slice/authSlice';

const store = configureStore({
	reducer: {
		cart: cartReducer,
		search: searchReducer,
		auth: authReducer,
	},
});

export default store;
