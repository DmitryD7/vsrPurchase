import { appCommonActions } from "../applicationCommonActions"
import { RequestStatusType } from "../types"
import {appReducer} from "./index";

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

let startState: InitialStateType;
const {setAppStatus, setAppError} = appCommonActions;

beforeEach(() => {
    startState = {
        error: null,
        status: "idle",
        isInitialized: false,
    }
});

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppError({error: 'some error'}))

    expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatus({status: 'loading'}))

    expect(endState.status).toBe('loading')
})