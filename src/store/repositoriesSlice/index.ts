import { IRepositoriesType } from "@/types/repositories.types";
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import axios from "axios";

interface IRepositoriesParams {
  searchQuery: string;
  selectedLanguage: string;
  currentPage: number;
  sortQuery: string;
}

export const getRepositories = createAsyncThunk(
  "repositoriesSlice/getRepositories",
  async (params: IRepositoriesParams, { rejectWithValue }) => {
    console.log("getRepositories", process.env.NEXT_PUBLIC_GITHUB_TOKEN);

    const { searchQuery, selectedLanguage, currentPage, sortQuery } = params;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}?q=${searchQuery}+language:${selectedLanguage}${sortQuery}&page=${currentPage}&per_page=10`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface stateType {
  repositories: IRepositoriesType[];
  totalResults: number;
  isLoading: boolean;
  error: string | null;
}

export const repositoriesSlice = createSlice({
  name: "repositoriesSlice",
  initialState: {
    repositories: [],
    totalResults: 0,
    isLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<stateType>) => {
    builder.addCase(
      getRepositories.fulfilled,
      (
        state: stateType,
        action: PayloadAction<{
          items: IRepositoriesType[];
          total_count: number;
        }>
      ) => {
        state.repositories = action.payload.items || [];
        state.totalResults = action.payload.total_count;
        state.isLoading = false;
      }
    );
    builder.addCase(getRepositories.rejected, (state: stateType, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getRepositories.pending, (state: stateType) => {
      state.isLoading = true;
    });
  },
});

export default repositoriesSlice.reducer;
