import {appCommonActions} from "../app/applicationCommonActions"
import {AxiosError} from "axios";

const {setAppError, setAppStatus} = appCommonActions

export const handleAsyncServerAppError = <T>(data: any, thunkAPI: ThunkAPIType) => {
    thunkAPI.dispatch(setAppError({error: data.error.length ? data.error : 'Some error occurred'}))
    thunkAPI.dispatch(setAppStatus({status: "failed"}))
    return thunkAPI.rejectWithValue({error: data.error})
}

export const handleAsyncServerNetworkError = (error: AxiosError, thunkAPI: ThunkAPIType) => {
    thunkAPI.dispatch(setAppError({error: error.message ? error.message : 'Some error occurred'}))
    thunkAPI.dispatch(setAppStatus({status: "failed"}))
    return thunkAPI.rejectWithValue({error: [error.message][0]})
}

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}

export type ThunkError = {
    rejectValue:
        {
            error: string,
        }
}