import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import searchReducer from './slice/searchSlice';

const store = configureStore({
	reducer: {
		cart: cartReducer,
		search: searchReducer,
	},
});

export default store;
