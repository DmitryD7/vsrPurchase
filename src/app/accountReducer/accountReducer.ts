import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../../api/api";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/errorUtils";
import {appCommonActions} from "../applicationCommonActions";

const {setAppStatus} = appCommonActions;

const debug = createAsyncThunk('auth/debug', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.debug();
        if (res.data.account) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return res.data.account.email;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
})

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        email: '',
        currentPlan: 'Basic' as CurrentPlanType,
        isEnterprisePending: false,
    },
    reducers: {
        setCurrentPlan: (state, action: PayloadAction<{ currentPlan: CurrentPlanType }>) => {
            state.currentPlan = action.payload.currentPlan;
        },
        setIsEnterprisePending: (state, action: PayloadAction<{ isEnterprisePending: boolean }>) => {
            state.isEnterprisePending = action.payload.isEnterprisePending;
        },
    },
    extraReducers: builder => {
        builder.addCase(debug.fulfilled, (state, action) => {
            state.email = action.payload;
        });
    },
});

export const accountAsync = {debug};

export type CurrentPlanType = 'Entry' | 'Basic' | 'Enterprise' | '';
