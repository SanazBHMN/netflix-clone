import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  value: {
    user: User | null;
    isLoading: boolean;
  };
}

interface User {
  email: string;
  usename: string;
}

const initialState: userState = {
  value: {
    user: null,
    isLoading: true,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value.user = action.payload;
      state.value.isLoading = false;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
