import { createSlice } from "@reduxjs/toolkit"
import { PoultryThunckAction } from "../Thunk/PoultryThunk";

const PoultrySlice = createSlice({
    name:"poultry",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers(builder){
        builder.addCase(PoultryThunckAction.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(PoultryThunckAction.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading= false;

        })
        builder.addCase(PoultryThunckAction.rejected,(state,action)=>{
            state.error = action.error;
            state.loading= false;

        })
    }
})




export const PoultrySliceReducer = PoultrySlice.reducer