import { createSlice } from "@reduxjs/toolkit"
import { PatchThunkAction } from "../Thunk/PatchThunk";

const PatchSlice = createSlice({
    name:"Patch",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers(builder){
        builder.addCase(PatchThunkAction.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(PatchThunkAction.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading= false;

        })
        builder.addCase(PatchThunkAction.rejected,(state,action)=>{
            state.error = action.error;
            state.loading= false;

        })
    }
})




export const PatchSliceReducer = PatchSlice.reducer