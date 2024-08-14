import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Base_Url } from "../Environment/Environment";


const API_URL = Base_Url
const auth_Token = "BslogiKey" + " " + localStorage.getItem('token')

export const FormThunkAction = createAsyncThunk(
    "input/create",
    async (payload) => {
        const response = await axios({
            method: "post",
            url: API_URL + "api/manage/create",
            headers: {
                Authorization: auth_Token
            },
            data: payload
        })
        return response.data
    }
)