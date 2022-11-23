import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    authAPI,
    BuySeatsParamsType,
    PaymentParamsType,
    SendEmailToSeatParamsType,
    SetSeatParamsType, UsersSeatType,
    vsrAPI
} from "../../api/api";
import {handleAsyncServerAppError, handleAsyncServerNetworkError, ThunkError} from "../../utils/errorUtils";
import {appCommonActions} from "../applicationCommonActions";
import {appActions} from "../appReducer";
import {authActions} from "../authReducer";

const {setAppStatus, setAppError} = appCommonActions;
const {initializeApp} = appActions;
const {login} = authActions;

const debug = createAsyncThunk('auth/debug', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.debug();
        if (res.data.account) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data.account.email;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

const buySeats = createAsyncThunk<undefined, BuySeatsParamsType, ThunkError>('account/buySeats', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await vsrAPI.buySeats(param);
        if (res.data.url) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data.url;
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
        if (res.data.seats) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data.seats;
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
        if (res.data) { // needs right condition
            console.log(res.data)
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data;
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
            thunkAPI.dispatch(setAppError({error: null}));
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
        if (res.data.seats) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data.seats;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

const getPayment = createAsyncThunk<undefined, PaymentParamsType, ThunkError>('account/payment', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.payment(param);
        if (res.data.url) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data.url;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

// const {seats} = seatsResponse;

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        email: '',
        payment: false,
        seats: [] as Array<UsersSeatType | {}>,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(debug.fulfilled, (state, action) => {
            state.email = action.payload;
        });
        builder.addCase(fetchSeats.fulfilled, (state, action) => {
            state.seats = action.payload;
        });
        builder.addCase(setSeat.fulfilled, (state, action) => {
            const index = action.meta.arg.index
            // @ts-ignore
            state.seats[index].url = action.payload;
        });
        builder.addCase(initializeApp.fulfilled, (state, action) => {
            state.payment = action.payload.payment;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.payment = action.payload.payment;
        });
    },
});

export const accountAsync = {
    debug,
    fetchSeats,
    setSeat,
    sendEmailToSeat,
    sendEmailToAllSeats,
    buySeats,
    getPayment,
};

export interface iUser {
    email: string,
    payment: boolean,
    seats: Array<UsersSeatType>,
}