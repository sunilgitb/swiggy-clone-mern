import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			state.items.push(action.payload);
		},
		clearCart: state => {
			state.items = [];
		},
		removeFromCart: (state, action) => {
			state.items = state.items.filter(
				el => el.info.id !== action.payload
			);
		},

		increaseQuantity: (state, action) => {
			const item = state.items.find(el => el.info.id === action.payload);
			item.quantity = item.quantity + 1;
		},
		decreaseQuantity: (state, action) => {
			const item = state.items.find(el => el.info.id === action.payload);
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
