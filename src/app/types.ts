import {rootReducer, store} from "./store";

export type AppRootStateType = ReturnType<RootReducerType>;
export type RootReducerType = typeof rootReducer;
export type AppDispatchType = typeof store.dispatch;

export type FormErrorType = {
    email?: string | null
    password?: string | null
    passwordConfirmation?: string
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'