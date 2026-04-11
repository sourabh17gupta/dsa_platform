import {configureStore} from "@reduxjs/toolkit"

import profileReducer from "./Slices/ProfileSlice"
import authReducer from "./Slices/authSlice";

export const store=configureStore({
    reducer:{
        profile:profileReducer,
        auth: authReducer,
    }
})
