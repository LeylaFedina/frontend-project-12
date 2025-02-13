import { createSlice } from '@reduxjs/toolkit';

const initialValidationState = {
  channelAddition: {
    result: null,
    errorMessage: '',
  },
};

const validationReducer = createSlice({
  name: 'validation',
  initialState: initialValidationState,
  reducers: {
    setChannelAdditionFailure: (state, { payload }) => {
      state.channelAddition.result = 'failure';
      state.channelAddition.errorMessage = payload.error;
    },
    setChannelAdditionSuccess: (state) => {
      state.channelAddition.result = 'success';
      state.channelAddition.errorMessage = '';
    },
  },
});

export default validationReducer.reducer;
export const { setChannelAdditionFailure, setChannelAdditionSuccess } = validationReducer.actions;
