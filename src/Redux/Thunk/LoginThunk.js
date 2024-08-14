import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { Base_Url } from "../Environment/Environment";


const API_URL = Base_Url

export const LoginThunkAction = createAsyncThunk(
    'users/login',

    async({userName,password},{rejectWithValue}) =>{
        try{
            const response = await axios({
                method:"post",
                url:API_URL + "auth/login",
                data:{userName,password}
             })
             return response.data
        }
        catch(error){
            if(error.response){
                return rejectWithValue (error.response.data)

            }
            else{
                return rejectWithValue({message:'an error occured'})
            }

        }
      
    }
)
