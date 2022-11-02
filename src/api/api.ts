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

export const vsrApi = {
    getSeats() {
        return instance.post('vsr/get-seat');
    },
    setSeat(data: SetSeatParamsType) {
        return instance.post('vsr/set-seat', data);
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