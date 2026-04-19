import {configureStore} from "@reduxjs/toolkit"
import questionReducer from "./Slices/questionSlices"
import singleQuestionReducer from "./Slices/singleQuestion"

export const store=configureStore({
    reducer:{
        question:questionReducer,
        singleQuestion:singleQuestionReducer,
    }
})
