import {iUser} from "./accountReducer";
import {accountActions, accountReducer} from "./index";
import {appActions} from "../appReducer";

const {debug, fetchSeats} = accountActions;
const {initializeApp} = appActions;

let startState: iUser;
const seats = [
    {
        email: '1a@b.com',
        url: 'https://1a@b.com',
    },
    {
        email: '2b@c.com',
        url: 'https://2b@c.com',
    },
    {
        email: '3c@d.com',
        url: 'https://3c@d.com',
    },
    {
        email: '4d@e.com',
        url: 'https://4d@e.com',
    },
]

beforeEach(() => {
    startState = {
        email: 'dd@gmail.com',
        seats,
        payment: false,
    }
});

test('correct email must be set', () => {
    const action = debug.fulfilled(startState.email, '');

    const endState = accountReducer(startState, action);
    expect(endState.email).toBe('dd@gmail.com');
});

test('correct items array must be fetched', () => {
    const action = fetchSeats.fulfilled(startState.seats, '');

    const endState = accountReducer(startState, action);

    expect(endState.seats).toHaveLength(4);
    expect(endState.seats[0].hasOwnProperty('email')).toBeTruthy();
    // @ts-ignore
    expect(endState.seats[0].email).toBe('1a@b.com');
});

test('correct payment must be set', () => {
    const {email, payment} = startState;
    const action = initializeApp.fulfilled({email, payment}, '', undefined);

    const endState = accountReducer(startState, action);
    expect(endState.payment).toBeFalsy()
});
