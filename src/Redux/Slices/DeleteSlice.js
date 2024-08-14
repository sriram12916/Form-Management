import { createSlice } from "@reduxjs/toolkit"
import { DeleteThunkAction } from "../Thunk/DeleteThunk";


const DeleteSlice = createSlice({
    name:"delete",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers(builder){
        builder.addCase(DeleteThunkAction.pending,(state)=>{
            state.loading = true ;

        })
        builder.addCase(DeleteThunkAction.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
        })
        builder.addCase(DeleteThunkAction.rejected,(state,action)=>{
            state.error = action.error;
            state.loading = false;
        })
    }
})




export const DeleteSliceReducer = DeleteSlice.reducer