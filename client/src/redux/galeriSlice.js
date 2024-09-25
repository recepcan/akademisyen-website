
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    error: '',
    loading: false,
    limit:false
};

export const fetchImages = createAsyncThunk('fetchImages', async () => {
    const response = await fetch(`/api/image/getimages`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Fetched data:', data); // Veriyi kontrol et
    return data;
  });
  



  const galeriSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        // highLimit: state => {
        //     state.limit = true;
        //   },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = "";
      });
      builder.addCase(fetchImages.fulfilled, (state, action) => {
        state.data = action.payload; // Veriyi doğrudan güncelliyor
        state.loading = false;
        state.error = "";
      });
      builder.addCase(fetchImages.rejected, (state) => {
        state.loading = false;
        state.error =` Error fetching services data ${state.error}`;
      });
      // builder.addCase(fetchPost6.pending, (state) => {
      //   state.loading = true;
      //   state.error = "";
      // });
      // builder.addCase(fetchPost6.fulfilled, (state, action) => {
      //   state.data = action.payload; // Veriyi doğrudan güncelliyor
      //   state.loading = false;
      //   state.error = "";
      // });
      // builder.addCase(fetchPost6.rejected, (state) => {
      //   state.loading = false;
      //   state.error = "Error fetching texts data";
      // });
    },
  });
  

export default galeriSlice.reducer;
