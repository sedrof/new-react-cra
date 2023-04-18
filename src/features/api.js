import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { config } from 'utils/instances';
import Cookies from 'js-cookie';


export const getTransactions = createAsyncThunk(
  "api/getTransactions",
  async ({ page, newSearch }, thunkAPI) => {
    try {
      const authState = thunkAPI.getState().user; // get the auth state
      const access_token = authState.access; 
      const res = await axios.get(`${process.env.REACT_APP_END_URL}calc/trans/?page=${page}&search=${newSearch}`, config(access_token))
      const data = await res.data;
      if (res.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const downloadCSV = createAsyncThunk(
  "api/downloadCSV",
  async (id, thunkAPI) => {
    // console.log(id)
    try {
      const authState = thunkAPI.getState().user; // get the auth state
      const access_token = authState.access; 
      const res = await axios.post(`${process.env.REACT_APP_END_URL}calc/csv/`, { uuid_list: id }, {
        responseType: 'blob', // tell axios to expect a binary response
        headers: {
          'Authorization': `JWT ${access_token}` // set the Authorization header with the access token
        }
      });

      const blob = new Blob([res.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'transactions.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const downloadPDF = createAsyncThunk(
  "api/downloadPDF",
  async ( id , thunkAPI) => {
    try {
      const authState = thunkAPI.getState().user; // get the auth state
      const access_token = authState.access; 
      const res = await axios.post(`${process.env.REACT_APP_END_URL}calc/pdf/`, { uuid_list: id }, {
        responseType: 'blob', // tell axios to expect a binary response
        headers: {
          'Authorization': `JWT ${access_token}` // set the Authorization header with the access token
        }
      });

      const blob = new Blob([res.data], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'transactions.zip');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const uploadTransactions = createAsyncThunk(
  "api/uploadTransactions",
  async (body, thunkAPI) => {
    const access_key = Cookies.get('access_token')

    try {
      const res = await axios.post(`${process.env.REACT_APP_END_URL}file/upload-csv/`,body, config(access_key))
      const data = res.data;
      if (res.status === 200) {
        return body;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteTransactions = createAsyncThunk(
  "api/deleteTransactions",
  async (body, thunkAPI) => {
    console.log(body, 'dds')
    try {
      const access_key = Cookies.get('access_token')
      // console.log(access_key, 'dffvvv')
      const res = await axios.post(`${process.env.REACT_APP_END_URL}calc/delete/`,body, config(access_key))
      const data = res.data;
      if (res.status === 200) {
        return body;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const singleDeleteTransactions = createAsyncThunk(
  "api/singleDeleteTransactions",
  async (body, thunkAPI) => {
    const access_key = Cookies.get('access_token')

    try {
      const res = await axios.delete(`${process.env.REACT_APP_END_URL}calc/trans/${body}`,config(access_key))
      const data = await res.data;
      if (res.status === 200) {
        return body;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const singleCreateTransaction = createAsyncThunk(
  "api/singleCreateTransaction",
  async (body, thunkAPI) => {
    const access_key = Cookies.get('access_token')
    try {
      const res = await axios.post(`${process.env.REACT_APP_END_URL}calc/create-single-transaction/`,body, config(access_key))
       
      const data = res.data;
      if (res.status === 200) {
        return body;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const singleUpdateTransaction = createAsyncThunk(
  'api/postData',
  async ({ data, ids }, thunkAPI) => {
    // console.log(ids, 'IDSS')
    // console.log(data, 'DATA')
    const body = JSON.stringify(data)
    // console.log(body, ' stringify body')
    const access_key = Cookies.get('access_token')
    try {
      // console.log(' trying')
      const res = await axios.put(`${process.env.REACT_APP_END_URL}calc/update/${ids}/`,body, config(access_key))
      const data = res.data;
      if (res.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      console.log('errorrs')
      if (!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const getSingleTransaction = createAsyncThunk(
  'athync/getSingleData',
  async ( ids , thunkAPI) => {
    try {
      const access_key = Cookies.get('access_token')
      const res = await axios.get(`${process.env.REACT_APP_END_URL}calc/transaction/${ids}`, config(access_key))
      const data = res.data;
      if (res.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  results: [],
  count: null,
  loading: false,
  uploadStatus: false,
  downloadCSVs: null,
  downloadPDFs: null
};

const transactionSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setUploadStatus: (state, action) => {
      state.uploadStatus = action.payload;
    },
    // other reducers here
  },
  extraReducers: (builder) => {
    const resetStatus = (state) => {
      state.uploadStatus = initialState.uploadStatus; // reset status to the initial value
    };
    builder
      .addCase(getTransactions.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.loading = false;
        state.count = action.payload["count"];
        state.results = action.payload["results"];
        // state.results.push(action.payload.data["results"])
      })
      .addCase(getTransactions.rejected, (state) => {
        state.loading = false;
        state.count = null;
      })
      .addCase(singleDeleteTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleDeleteTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.results = state.results.filter(
          (item) => item.id !== action.payload
        );
        state.statuss = action.payload;
      })
      .addCase(singleDeleteTransactions.rejected, (state, action) => {
        state.loading = false;
        state.statuss = action.payload;
      })
      .addCase(uploadTransactions.pending, (state) => {
        // state.loading = true;
        state.uploadStatus = true;
      })
      .addCase(uploadTransactions.fulfilled, (state, action) => {
        // state.loading = false;
        state.uploadStatus = false;
      })
      .addCase(uploadTransactions.rejected, (state) => {
        // state.loading = false;
        state.uploadStatus = false;
        // state.status = 'failed with error';
      })
      .addCase(deleteTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTransactions.fulfilled, (state, action) => {
        state.loading = false;
        const items = action.payload;
        state.results = state.results.filter((a) => items.includes(a.Id));
        state.statuss = action.payload;
      })
      .addCase(deleteTransactions.rejected, (state, action) => {
        state.loading = false;
        state.statuss = action.payload;
      })
      .addCase(downloadCSV.pending, (state) => {
        state.loading = true;
      })
      .addCase(downloadCSV.fulfilled, (state, action) => {
        state.loading = false;
        const items = action.payload;
        // localStorage.setItem('downloadUrl', items['url'])
        console.log(action.payload)
        state.downloadCSVs = items['url']
      })
      .addCase(downloadCSV.rejected, (state, action) => {
        // console.log(action.payload, 'payload')
        state.loading = false;
      })
      .addCase(downloadPDF.pending, (state) => {
        state.loading = true;
      })
      .addCase(downloadPDF.fulfilled, (state, action) => {
        state.loading = false;
        const items = action.payload;
        state.downloadPDFs = items['url']
      })
      .addCase(downloadPDF.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(singleCreateTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleCreateTransaction.fulfilled, (state, action) => {
        state.loading = false;
        const items = action.payload;
      })
      .addCase(singleCreateTransaction.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(singleUpdateTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleUpdateTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.results = state.results.map((result) => {
          if (result.id === action.payload.id) {
            return action.payload;
          }
          return result;
        });
      })
      .addCase(singleUpdateTransaction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSingleTransaction.pending, (state) =>{
        state.loading = true
      })
      .addCase(getSingleTransaction.fulfilled, (state, action) =>{
        state.loading = false
        // console.log(action.status, 'payload from cases')
        state.statuss = action.payload.status
      })
      .addCase(getSingleTransaction.rejected, (state) =>{
        state.loading = true
      });
  },
});
export const { setUploadStatus } = transactionSlice.actions;
export default transactionSlice.reducer;
