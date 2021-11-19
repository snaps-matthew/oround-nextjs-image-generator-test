import { AppState } from 'app/store';
import { createSlice } from '@reduxjs/toolkit';

interface Types {
  value: boolean;
}

const initialState: Types = {
  value: false,
};

const { actions, reducer } = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    setActive: (state) => {
      state.value = true;
    },
    setInActive: (state) => {
      state.value = false;
    },
    doToggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const toggle = (state: AppState) => state.toggle.value;

export const { setActive, setInActive, doToggle } = actions;

export default reducer;
