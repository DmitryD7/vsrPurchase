import {iUser} from "./accountReducer";
import {accountActions, accountReducer} from "./index";

const {debug} = accountActions;

let startState: iUser;

beforeEach(() => {
    startState = {
        email: 'dd@gmail.com',
        numberOfSeats: 5,
        seats: []
    }
});

test('correct email should be set', () => {
    const action = debug.fulfilled(startState.email, '');

    const endState = accountReducer(startState, action);
    expect(endState.email).toBe('dd@gmail.com');
});