import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { authReducer } from "./authReducer";
import {appReducer} from "./appReducer";
import { accountReducer } from "./accountReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    account: accountReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});