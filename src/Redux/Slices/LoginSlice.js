import { createSlice } from "@reduxjs/toolkit"
import { LoginThunkAction } from "../Thunk/LoginThunk"

const LoginSlice =createSlice({
    name:"Login",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers(builder){
        builder.addCase(LoginThunkAction.pending,(state)=>{
           state.loading=true;
        })
        builder.addCase(LoginThunkAction.fulfilled,(state,action)=>{
            state.data = action.payload 
            state.loading= false;

        })
        builder.addCase(LoginThunkAction.rejected,(state,action)=>{
            state.data = action.error
            state.loading= false;


        })
    }
})



export const LoginSliceReducers = LoginSlice.reducer