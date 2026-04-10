import {configureStore} from "@reduxjs/toolkit"

import profileReducer from "./Slices/ProfileSlice"

export const store=configureStore({
    reducer:{
        profile:profileReducer,
    }
})
