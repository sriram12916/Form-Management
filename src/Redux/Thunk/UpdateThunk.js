import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Base_Url } from "../Environment/Environment";


const API_URL = Base_Url
const auth_Token = "BslogiKey" + " " + localStorage.getItem('token')

export const UpdateThunkAction = createAsyncThunk(
    "Update/user",
    async (UpdatePayload,thunkAPI) => {
        try{
            const response = await axios({
                method: "put",
                url: API_URL + "api/manage/update",
                headers: {
                    Authorization: auth_Token
                },
                data: UpdatePayload,
            })
            return response.data
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
      
    }
)