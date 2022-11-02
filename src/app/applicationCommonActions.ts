import {createAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "./types";

const setAppStatus = createAction<{ status: RequestStatusType }>('app/setAppStatus')

const setAppError = createAction<{ error: string | null }>('app/setAppError')

export const appCommonActions = {
    setAppStatus,
    setAppError
}