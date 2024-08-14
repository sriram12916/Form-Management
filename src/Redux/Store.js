import {configureStore} from '@reduxjs/toolkit'
import { LoginSliceReducers } from './Slices/LoginSlice'
import { ManageSliceReducer } from './Slices/ManageSlice'
import { PoultrySliceReducer } from './Slices/PoultrySlice'
import { FormSliceReducer } from './Slices/FormSlice'
import { ExpenseSliceReducer } from './Slices/ExpenseSlice'
import { UpdateSliceReducer } from './Slices/UpdateSlice'
import { PatchSliceReducer } from './Slices/PatchSlice'
import { DeleteSliceReducer } from './Slices/DeleteSlice'

export const store  = configureStore({
    reducer:{
        LoginReducer : LoginSliceReducers,
        ManageReducer : ManageSliceReducer,
        PoultryReducer : PoultrySliceReducer,
        ExpenseReducer:ExpenseSliceReducer,
        FormReducer:FormSliceReducer,
        UpdateReducer:UpdateSliceReducer,
        PatchReducer:PatchSliceReducer,
        DeleteReducer:DeleteSliceReducer,
        

    }
})