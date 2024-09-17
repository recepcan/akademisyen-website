
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    error: '',
    loading: false,
    limit:false
};

// export const fetchPublications = createAsyncThunk('fetchPublications', async (currentUser) => {
//     const response = await fetch(`/api/publication/getPublications?userId=${currentUser._id}&limit=50`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     console.log('Fetched data:', data); // Veriyi kontrol et
//     return data;
//   });
  
  export const fetchPublications = createAsyncThunk('publications/fetchPublications', async ({ currentUser, category }) => {
    const response = await fetch(`/api/publication/getPublications?userId=${currentUser._id}&category=${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch publications');
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



  const publicationSlice = createSlice({
    name: "publications",
    initialState,
    reducers: {
        // highLimit: state => {
        //     state.limit = true;
        //   },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchPublications.pending, (state) => {
        state.loading = true;
        state.error = "";
      });
      builder.addCase(fetchPublications.fulfilled, (state, action) => {
        state.data = action.payload; // Veriyi doğrudan güncelliyor
        state.loading = false;
        state.error = "";
      });
      builder.addCase(fetchPublications.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching texts data";
      });
    //   builder.addCase(fetchPublications.pending, (state) => {
    //     state.loading = true;
    //     state.error = "";
    //   });
    //   builder.addCase(fetchPublications.fulfilled, (state, action) => {
    //     state.data = action.payload; // Veriyi doğrudan güncelliyor
    //     state.loading = false;
    //     state.error = "";
    //   });
    //   builder.addCase(fetchPublications.rejected, (state) => {
    //     state.loading = false;
    //     state.error = "Error fetching texts data";
    //   });
    },
  });
  

export default publicationSlice.reducer;
