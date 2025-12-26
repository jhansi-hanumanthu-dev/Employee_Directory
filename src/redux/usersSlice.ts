import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsersApi } from '../services/api';

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async ({ page }: { page: number }) => {
    const limit = 20;
    const skip = (page - 1) * limit;
    const res = await fetchUsersApi(limit, skip);
    return res.users;
  }
);

interface UsersState {
  list: any[];
  page: number;
  loading: boolean;
  searchText: string;
}

const initialState: UsersState = {
  list: [],
  page: 1,
  loading: false,
  searchText: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
    setUsers(state, action) {
      state.list = action.payload;
    },
    incrementPage(state) {
      state.page += 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ PREVENT DUPLICATE USERS (VERY IMPORTANT)
        const newUsers = action.payload.filter(
          (u: any) => !state.list.some(e => e.id === u.id)
        );

        state.list = [...state.list, ...newUsers];
      })
      .addCase(fetchUsers.rejected, state => {
        state.loading = false;
      });
  },
});

export const { setSearchText, setUsers, incrementPage } = usersSlice.actions;
export default usersSlice.reducer;
