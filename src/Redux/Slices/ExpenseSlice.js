import { createSlice } from "@reduxjs/toolkit"
import { ExpenseThunkAction } from "../Thunk/Expensethunk";

const ExpenseSlice = createSlice({
    name:"expense",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers(builder){
        builder.addCase(ExpenseThunkAction.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(ExpenseThunkAction.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;

        })
        builder.addCase(ExpenseThunkAction.rejected,(state,action)=>{
            state.error = action.error;
            state.loading = false;

        })
    }
})




export const ExpenseSliceReducer = ExpenseSlice.reducer