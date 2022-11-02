import {AppRootStateType} from "../types";
import {accountAsync, accountSlice} from "./accountReducer";

const selectAccEmail = (state: AppRootStateType) => state.account.email;
const selectCurrentPlan = (state: AppRootStateType) => state.account.currentPlan;
const selectIsEnterprisePending = (state: AppRootStateType) => state.account.isEnterprisePending;

const accSelectors = {
    selectCurrentPlan,
    selectAccEmail,
    selectIsEnterprisePending,
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