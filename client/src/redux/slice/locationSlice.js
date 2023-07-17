import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: JSON.parse(window.localStorage.getItem('locationInfo')) || {
    lat: 25.5940947,
    lng: 85.1375645,
    place_type: 'Others',
    formatted_address: 'Patna, Bihar',
  },
};
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    changeLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { changeLocation } = locationSlice.actions;
export default locationSlice.reducer;
