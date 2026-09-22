import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/hotels";

export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
  async (
    {
      search = "",
      minPrice = "",
      maxPrice = "",
      page = 1,
      limit = 6
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const offset = (page - 1) * limit;

      const response = await axios.get(API_URL, {
        params: {
          search,
          minPrice,
          maxPrice,
          offset,
          limit
        }
      });

      return {
        ...response.data,
        currentPage: page,
        limit
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch hotels"
      );
    }
  }
);

export const addHotel = createAsyncThunk(
  "hotels/addHotel",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_URL,
        formData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to add hotel"
      );
    }
  }
);

// Update hotel
export const updateHotel = createAsyncThunk(
  "hotels/updateHotel",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        formData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update hotel"
      );
    }
  }
);

// Delete hotel
export const deleteHotel = createAsyncThunk(
  "hotels/deleteHotel",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete hotel"
      );
    }
  }
);

const initialState = {
  hotels: [],
  loading: false,
  error: null,
  AddSuccess:false,
  success: false,
  deletedSuccess:false,
  total: 0,
  currentPage: 1,
  limit: 6
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,

  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.success = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearSuccess: (state) => {
      state.success = false;
      state.deletedSuccess = false;
      state.AddSuccess = false;
    }
  },

  extraReducers: (builder) => {
    builder

      // Fetch hotels
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload.hotels || [];
        state.total = action.payload.total || 0;
        state.currentPage = action.payload.currentPage || 1;
        state.limit = action.payload.limit || 6;
      })

      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch hotels";
      })

      // Add hotel
      .addCase(addHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.AddSuccess = false;
      })

      .addCase(addHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.AddSuccess = true;

        const newHotel =
          action.payload?.hotel ||
          action.payload?.data;

        if (newHotel) {
          state.hotels.push(newHotel);
          state.total += 1;
        }
      })

      .addCase(addHotel.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to add hotel";
        state.AddSuccess = false;
      })

      // Update hotel
      .addCase(updateHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(updateHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updatedHotel =
          action.payload?.hotel ||
          action.payload?.data;

        if (updatedHotel) {
          const index = state.hotels.findIndex(
            (hotel) => hotel.id === updatedHotel.id
          );

          if (index !== -1) {
            state.hotels[index] = updatedHotel;
          }
        }
      })

      .addCase(updateHotel.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to update hotel";
        state.success = false;
      })

      // Delete hotel
      .addCase(deleteHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.deletedSuccess = false;
      })

      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedSuccess = true;

        state.hotels = state.hotels.filter(
          (hotel) => hotel.id !== action.payload
        );

        state.total = Math.max(0, state.total - 1);
      })

      .addCase(deleteHotel.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to delete hotel";
        state.deletedSuccess = false;
      });
  }
});

export const {
  clearStatus,
  clearError,
  clearSuccess
} = hotelSlice.actions;

export default hotelSlice.reducer;
