import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
 import { Base_Url } from "../Environment/Environment";

const API_URL = Base_Url
export const ManageThunkAction = createAsyncThunk(

    "manage/get",
    async () => {
        const auth_Token = "BslogiKey" + " " + localStorage.getItem('token')
        console.log('auth_Token', auth_Token)


        console.log('hi')
        const response = await axios({
            method: "get",
            url: API_URL+"api/manage/get",
            headers: {
                Authorization: auth_Token,
            }
        })
        return response.data
    }
)

