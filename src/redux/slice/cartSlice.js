import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => [...state, action.payload],
		clearCart: () => [],
		removeFromCart: (state, action) => {
			const idx = state.findIndex(el => el.info.id === action.payload);
			state.splice(idx, 1);
		},

		increaseQuantity: (state, action) => {
			const item = state.find(el => el.info.id === action.payload);
			item.quantity = item.quantity + 1;
		},
		decreaseQuantity: (state, action) => {
			const item = state.find(el => el.info.id === action.payload);
			item.quantity = item.quantity - 1;
		},
	},
});

export const {
	addToCart,
	clearCart,
	removeFromCart,
	increaseQuantity,
	decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
