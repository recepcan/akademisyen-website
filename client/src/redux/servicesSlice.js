
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    error: '',
    loading: false,
    limit:false
};

export const fetchServices = createAsyncThunk('fetchServices', async () => {
    const response = await fetch(`/api/service/getservices`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Fetched data:', data); // Veriyi kontrol et
    return data;
  });
  

//  export  const fetchPost6 = createAsyncThunk('fetchPost6',async(limit) => {
//     const res = await fetch(`/api/post/getPosts?limit=${limit}`);
//     if (!res.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await res.json();
//     console.log('Fetched data 6:', data);
//     return data;
//   });



  const servicesSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        // highLimit: state => {
        //     state.limit = true;
        //   },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = "";
      });
      builder.addCase(fetchServices.fulfilled, (state, action) => {
        state.data = action.payload; // Veriyi doğrudan güncelliyor
        state.loading = false;
        state.error = "";
      });
      builder.addCase(fetchServices.rejected, (state) => {
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
  

export default servicesSlice.reducer;
