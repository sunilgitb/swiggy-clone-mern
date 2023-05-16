import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	text: '',
};
const cartSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		changeText: (state, actions) => {
			state.text = actions.payload;
		},
	},
});

export const { changeText } = cartSlice.actions;
export default cartSlice.reducer;
