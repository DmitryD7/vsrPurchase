import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RequestStatusType} from "../types";
import {authActions} from "../authReducer";
import {appCommonActions} from "../applicationCommonActions";
import {authAPI} from "../../api/api";
import {handleAsyncServerAppError, handleAsyncServerNetworkError, ThunkError} from "../../utils/errorUtils";

const {setIsLoggedIn} = authActions;
const {setAppStatus, setAppError} = appCommonActions;

const initializeApp = createAsyncThunk<undefined, undefined, ThunkError>('app/initializeApp', async (params, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.refresh();
        if (res.data.ok === 1) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setIsLoggedIn({value: true}));
        } else {
            thunkAPI.dispatch(setIsLoggedIn({value: false}));
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, state => {
            state.isInitialized = true;
        });
        builder.addCase(setAppStatus, (state, action) => {
            state.status = action.payload.status;
        });
        builder.addCase(setAppError, (state, action) => {
            state.error = action.payload.error;
        });
    },
});

export const asyncAppActions = {initializeApp};