import {authActions, authReducer} from "./index";


let startState: { isLoggedIn: boolean };
const {login, logout, setIsLoggedIn} = authActions;

beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
});

test('correct isLoggedIn value must be set', () => {
    const endState = authReducer(startState, setIsLoggedIn({isLoggedIn: true}));

    expect(endState.isLoggedIn).toBeTruthy();
});

test('truthy isLoggedIn value must be set after login', () => {
    const action = login.fulfilled({email: '', payment: true}, '', {email: '', password: ''});

    const endState = authReducer(startState, action);
    expect(endState.isLoggedIn).toBeTruthy();
});

test('falsy isLoggedIn value must be set after logout', () => {
    const action = logout.fulfilled({}, '');

    const endState = authReducer(startState, action);
    expect(endState.isLoggedIn).toBeFalsy();
});