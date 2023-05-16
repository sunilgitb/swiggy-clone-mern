import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			state = [...state, action.payload];
		},
		clearCart: state => {
			state = [];
		},
		removeFromCart: (state, action) => {
			state = state.filter(item => item.id !== action.payload);
		},
	},
});

export const { addToCart, clearCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
