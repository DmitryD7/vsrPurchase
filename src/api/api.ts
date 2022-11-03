import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://stylescan.com/account/',
    withCredentials: true,
});

export const authAPI = {
    me() {
        return instance.get('');
    },
    signUp(data: SignupParamsType) {
        return instance.post('signup', data);
    },
    login(data: LoginParamsType) {
        return instance.post('login', data);
    },
    logout() {
        return instance.get('logout');
    },
    deleteAcc() {
        return instance.get('delete');
    },
    changePassword(data: ResetPasswordDataType) {
        return instance.post('reset_password', data);
    },
    requestResetPassword(data: RequestResetPasswordType) {
        return instance.post('reset_request', data);
    },
    refresh() {
        return instance.post('refresh');
    },
    debug() {
        return instance.get('debug.json');
    },
};

export const vsrAPI = {
    getSeats() {
        return instance.post<GetSeatsResponseType>('vsr/get-seat');
    },
    setSeat(data: SetSeatParamsType) {
        return instance.post<SetSeatResponseType>('vsr/set-seat', data);
    },
    sendEmailToSeat(data: SendEmailToSeatParamsType) {
        return instance.post('vsr/email-seat', data);
    },
    sendEmailToAllSeats() {
        return instance.post('vsr/email-all-seats');
    },
}

export type LoginParamsType = {
    email: string,
    password: string,
}

export type SignupParamsType = LoginParamsType & { redirect?: string }

export type RequestResetPasswordType = {
    email: string,
    redirect?: string,
}

export type ResetPasswordDataType = {
    code: string,
    password: string,
}

export type SetSeatParamsType = {
    iSeatNumber: number, // index of seat
    sEmail: string,
}

export type SendEmailToSeatParamsType = {
    iSeatNumber: number
}

export type UsersSeatType = {
    sEmail: string,
    sURL: string
}

export type GetSeatsResponseType = {
    iMaxSeats: number, // non-negative integer
    vSeats: Array<UsersSeatType>
}

export type SetSeatResponseType = {
    ok: boolean,
    sURL: string
}