import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {
    //action
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUsers: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoading, setUsers } = authSlice.actions;
export default authSlice.reducer;
