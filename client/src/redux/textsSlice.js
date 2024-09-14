import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    error: '',
    loading: false,
    textById: null, // Yeni eklenen state
    textByIdLoading: false,
    textByIdError: ''
};

export const fetchTexts = createAsyncThunk('fetchTexts', async (currentUser) => {
    const response = await fetch(`/api/text/getTexts?userId=${currentUser._id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Fetched data:', data); // Veriyi kontrol et
    return data;
  });
  


export const fetchTextById = createAsyncThunk('fetchTextById', async (textId) => {
  const response = await fetch(`/api/text/getTexts?textId=${textId}`);
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.texts[0]; // İlk elemanı döndürüyor
});

  const textsSlice = createSlice({
    name: "texts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchTexts.pending, (state) => {
        state.loading = true;
        state.error = "";
      });
      builder.addCase(fetchTexts.fulfilled, (state, action) => {
        state.data = action.payload; // Veriyi doğrudan güncelliyor
        state.loading = false;
        state.error = "";
      });
      builder.addCase(fetchTexts.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching texts data";
      });
      builder.addCase(fetchTextById.pending, (state) => {
        state.textByIdLoading = true;
        state.textByIdError = "";
    });
    builder.addCase(fetchTextById.fulfilled, (state, action) => {
        state.textById = action.payload;
        state.textByIdLoading = false;
        state.textByIdError = "";
    });
    builder.addCase(fetchTextById.rejected, (state) => {
        state.textByIdLoading = false;
        state.textByIdError = "Error fetching text by ID";
    });
},
    
  });
  

export default textsSlice.reducer;