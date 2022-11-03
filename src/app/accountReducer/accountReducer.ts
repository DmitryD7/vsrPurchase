import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI, vsrAPI, SetSeatParamsType, UsersSeatType, SendEmailToSeatParamsType} from "../../api/api";
import {handleAsyncServerAppError, handleAsyncServerNetworkError, ThunkError} from "../../utils/errorUtils";
import {appCommonActions} from "../applicationCommonActions";
import {seatsResponse} from "../../assets/seats";

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
});

const fetchSeats = createAsyncThunk('account/fetchSeats', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await vsrAPI.getSeats();
        if (res.data.iMaxSeats) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return res.data;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

const setSeat = createAsyncThunk<undefined, SetSeatParamsType, ThunkError>('account/setSeat', async (params, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await vsrAPI.setSeat(params);
        if (res.data.ok === true) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return res.data.sURL;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

const sendEmailToSeat = createAsyncThunk<undefined, SendEmailToSeatParamsType, ThunkError>('account/sendEmailToSeat', async (params, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await vsrAPI.sendEmailToSeat(params);
        if (res.data.ok === true) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return res.data.ok;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

const sendEmailToAllSeats = createAsyncThunk<undefined, undefined, ThunkError>('account/sendEmailToSeat', async (params, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await vsrAPI.sendEmailToAllSeats();
        if (res.data.ok === true) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return res.data.ok;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

const {iMaxSeats, vSeats} = seatsResponse;

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        email: '',
        numberOfSeats: iMaxSeats,
        seats: vSeats,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(debug.fulfilled, (state, action) => {
            state.email = action.payload;
        });
        builder.addCase(fetchSeats.fulfilled, (state, action) => {
            state.numberOfSeats = action.payload.iMaxSeats;
            state.seats = action.payload.vSeats;
        });
        builder.addCase(setSeat.fulfilled, (state, action) => {
            const index = action.meta.arg.iSeatNumber
            // @ts-ignore
            state.seats[index].url = action.payload;
        });
    },
});

export const accountAsync = {
    debug,
    fetchSeats,
    setSeat,
    sendEmailToSeat,
    sendEmailToAllSeats,
};

export interface iUser {
    email: string,
    numberOfSeats: number,
    seats: []
}