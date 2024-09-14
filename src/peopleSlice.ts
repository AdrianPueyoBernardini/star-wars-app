import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Person {
  name: string;
  height: string;
  gender: string;
  mass: string;
  url: string;
  homeworld: string;
}

interface PeopleState {
  data: Person[];
  loading: boolean;
  error: string | null;
}

const initialState: PeopleState = {
  data: [],
  loading: false,
  error: null,
};


export const fetchPeople = createAsyncThunk('people/fetchPeople', async () => {
  let allResults: Person[] = [];
  let nextUrl: string | null = 'https://swapi.dev/api/people/';

  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();
    allResults = [...allResults, ...data.results];
    nextUrl = data.next;  
  }

  return allResults;
});

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch people';
      });
  },
});

export default peopleSlice.reducer;

