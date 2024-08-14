import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


const API_URL = " http://101.53.155.156:8089/api/manage/get/";

export const PatchThunkAction = createAsyncThunk(
    'patch/user',
    async ({id}, thunkAPI) => {
        try {
            const auth_Token = "BslogiKey " + localStorage.getItem('token');

            const response = await axios({
                method: 'get',
                url: API_URL + id,
                headers: {
                    Authorization: auth_Token,
                },
            });

            return response.data; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); 
        }
    }
);
