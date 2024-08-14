import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const API_URL = "http://101.53.155.156:8089/api/manage/delete/"
const auth_Token = "BslogiKey" + " " + localStorage.getItem('token')

export const DeleteThunkAction = createAsyncThunk(
    "Delete/data",
    async (deleteData) => {
        const response = await axios({
            method: "delete",
            url: API_URL+ deleteData.id,
            headers: {
                Authorization: auth_Token
            },
            data:deleteData ,
        })
        return response.data
    }
)