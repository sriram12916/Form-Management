import { createSlice } from "@reduxjs/toolkit"
import { FormThunkAction } from "../Thunk/FormThunk";

const FormSlice = createSlice({
    name:"form",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers(builder){
        builder.addCase(FormThunkAction.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(FormThunkAction.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
        })
        builder.addCase(FormThunkAction.rejected,(state,action)=>{
            state.error = action.error;
            state.loading = false;
        })
    }
})




export const FormSliceReducer = FormSlice.reducer