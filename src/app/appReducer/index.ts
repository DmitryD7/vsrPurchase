import {appSlice, asyncAppActions} from "./appReducer";
import {AppRootStateType} from "../types";

export const selectStatus = (state: AppRootStateType) => state.app.status;
export const selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized;

const appReducer = appSlice.reducer;

const appActions = {
    ...asyncAppActions,
    ...appSlice.actions,
};

export {
    appReducer,
    appActions,
};