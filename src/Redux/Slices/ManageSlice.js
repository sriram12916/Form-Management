import { createSlice } from "@reduxjs/toolkit"
import { ManageThunkAction } from "../Thunk/ManageThunk"

const ManageSlice = createSlice({
    name:"manage",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers(builder){
        builder.addCase(ManageThunkAction.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(ManageThunkAction.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading= false;
            
        })
        builder.addCase(ManageThunkAction.rejected,(state,action)=>{
            state.error = action.error;
            state.loading= false;

        })
    }
})




export const ManageSliceReducer = ManageSlice.reducer