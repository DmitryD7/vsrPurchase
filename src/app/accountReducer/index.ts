import {AppRootStateType} from "../types";
import {accountAsync, accountSlice} from "./accountReducer";

const selectAccEmail = (state: AppRootStateType) => state.account.email;
const selectSeats = (state: AppRootStateType) => state.account.seats;
const selectPayment = (state: AppRootStateType) => state.account.payment;

const accSelectors = {
    selectAccEmail,
    selectSeats,
    selectPayment,
}

const accountReducer = accountSlice.reducer;

export const accountActions = {
    ...accountSlice.actions,
    ...accountAsync,
}

export {
    accountReducer,
    accSelectors
}