import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Base_Url } from "../Environment/Environment";


const API_URL = Base_Url
const auth_Token = "BslogiKey" + " " + localStorage.getItem('token')

 export const ExpenseThunkAction = createAsyncThunk(
    "expense/get",
    async()=>{
       const response =  await axios({
            method:"get",
            url:API_URL + "api/expense/get",
            headers:{
                Authorization:auth_Token
            }

        })
        return response.data
    }
)