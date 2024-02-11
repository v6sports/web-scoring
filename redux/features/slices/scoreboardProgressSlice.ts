import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ILoading {
  isLoading: boolean;
}
const initialState: ILoading = {
  isLoading: false,
};
export const loadingSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    getLoadingSlice: (state, action: PayloadAction<ILoading>) => {
      return {
        ...action.payload,
      };
    },

    setLoadingFalse: (state) => {
      return {
        isLoading: false,
      };
    },
    setLodingTrue: (state) => {
      return {
        isLoading: true,
      };
    },
  },
});

export const { getLoadingSlice, setLoadingFalse, setLodingTrue } =
  loadingSlice.actions;
export default loadingSlice.reducer;
