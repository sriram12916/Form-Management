import { createSlice } from "@reduxjs/toolkit"
import { UpdateThunkAction } from "../Thunk/UpdateThunk";

const UpdateSlice = createSlice({
    name:"poultry",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers(builder){
        builder.addCase(UpdateThunkAction.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(UpdateThunkAction.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading= false;

        })
        builder.addCase(UpdateThunkAction.rejected,(state,action)=>{
            state.error = action.error;
            state.loading= false;

        })
    }
})




export const UpdateSliceReducer = UpdateSlice.reducer