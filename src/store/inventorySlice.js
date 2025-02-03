import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  isAdmin: true,
  loading: false,
  error: null,
};

export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async () => {
    const response = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory');
    const data = await response.json();
    return data.map(product => ({
      ...product,
      disabled: false
    }));
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    toggleUserMode: (state) => {
      state.isAdmin = !state.isAdmin;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.name !== action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.name === action.payload.name);
      if (index !== -1) {
        const price = parseFloat(action.payload.price.replace('$', ''));
        const quantity = action.payload.quantity;
        const value = `$${(price * quantity).toString()}`;
        
        state.products[index] = {
          ...action.payload,
          value
        };
      }
    },
    toggleProductStatus: (state, action) => {
      const product = state.products.find(p => p.name === action.payload);
      if (product) {
        product.disabled = !product.disabled;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch inventory';
      });
  },
});

export const { toggleUserMode, deleteProduct, updateProduct, toggleProductStatus } = inventorySlice.actions;
export default inventorySlice.reducer;