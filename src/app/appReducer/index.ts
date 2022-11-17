import {appSlice, asyncAppActions} from "./appReducer";
import {AppRootStateType} from "../types";

const selectStatus = (state: AppRootStateType) => state.app.status;
const selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized;
const selectError = (state: AppRootStateType) => state.app.error;



const appReducer = appSlice.reducer;
const appSelectors = {
    selectStatus,
    selectIsInitialized,
    selectError,
}

const appActions = {
    ...asyncAppActions,
    ...appSlice.actions,
};

export {
    appReducer,
    appActions,
    appSelectors,
};