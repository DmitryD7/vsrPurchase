import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType, LoginResponseType, RequestPasswordResetType, SignupParamsType,} from "../../api/api";
import {appCommonActions} from "../applicationCommonActions";
import {handleAsyncServerAppError, handleAsyncServerNetworkError, ThunkError} from "../../utils/errorUtils";

const {setAppStatus, setAppError} = appCommonActions

const login = createAsyncThunk<LoginResponseType, LoginParamsType, ThunkError>('auth/login', async (params, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.login(params);
        if (res.data.email) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
})

const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.logout();
        if (res.status === 200) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data.ok;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
})

const signup = createAsyncThunk<undefined, SignupParamsType, ThunkError>('auth/signup', async (params, thunkAPI) => {
    setAppStatus({status: 'loading'});
    try {
        const res = await authAPI.signUp(params);
        if (res.data.email) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data.email;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
})

const requestResetPassword = createAsyncThunk<undefined, RequestPasswordResetType, ThunkError>('auth/request_reset', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.requestPasswordReset(param);
        if (res.status === 200) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data.ok;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoggedIn = true;
            }
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false;
        });
    },
});

export const authAsyncActions = {
    login,
    logout,
    signup,
    requestResetPassword,
}