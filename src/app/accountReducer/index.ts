import {AppRootStateType} from "../types";
import {accountAsync, accountSlice} from "./accountReducer";

const selectAccEmail = (state: AppRootStateType) => state.account.email;
const selectNumberOfSeats = (state: AppRootStateType) => state.account.numberOfSeats;
const selectSeats = (state: AppRootStateType) => state.account.seats;

const accSelectors = {
    selectAccEmail,
    selectNumberOfSeats,
    selectSeats,
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