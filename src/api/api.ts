import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://stylescan.com/account/',
    withCredentials: true,
});

export const authAPI = {
    signUp(data: SignupParamsType) {
        return instance.post<SignupResponseType>('signup', data);
    },
    login(data: LoginParamsType) {
        return instance.post<LoginResponseType>('login', data);
    },
    logout() {
        return instance.get('logout');
    },
    deleteAcc() {
        return instance.get('delete');
    },
    changePassword(data: ChangePasswordDataType) {
        return instance.post('reset-password', data);
    },
    requestPasswordReset(data: RequestPasswordResetType) {
        return instance.post('reset-request', data);
    },
    refresh() {
        return instance.post<LoginResponseType>('refresh');
    },
    debug() {
        return instance.get('debug.json');
    },
    payment(params: PaymentParamsType) {
        return instance.post<{url: string}>('payment', params);
    },
};

export const vsrAPI = {
    buySeats(params: BuySeatsParamsType) {
        return instance.post<{ url: string }>('vsr/buy-seats', params);
    },
    setSeat(data: SetSeatParamsType) {
        return instance.post<SetSeatResponseType>('vsr/set-seat', data);
    },
    getSeats() {
        return instance.post<GetSeatsResponseType>('vsr/get-seats');
    },
    sendEmailToSeat(data: SendEmailToSeatParamsType) {
        return instance.post('vsr/email-seat', data);
    },
    sendEmailToAllSeats() {
        return instance.post('vsr/email-all-seats');
    },
}

//Types for Auth
export type LoginParamsType = {
    email: string,
    password: string,
}
export type LoginResponseType = {
    email: string,		// account identifier
    payment: boolean,		// does user have a stripe account
    admin?: boolean,		// is user an administrator
    error?: string
}

export type SignupParamsType = LoginParamsType & { redirect?: string }

export type SignupResponseType = {
    email: string
}

export type RequestPasswordResetType = {
    email: string,
    redirect?: string,
}

export type ChangePasswordDataType = {
    code: string,
    password: string,
}


//Types for vsr
export type BuySeatsParamsType = {
    seats?: number  // initial number of seats, default 5
    url?: string     // return url that the portal or checkout exits to
}

export type SetSeatParamsType = {
    index: number, // index of seat
    email: string,
}

export type SendEmailToSeatParamsType = {
    index: number
}

export type UsersSeatType = {
    email: string,
    url: string
}

export type GetSeatsResponseType = {
    seats: Array<UsersSeatType | {}>
}

export type PaymentParamsType = {
    url?: string
}

export type SetSeatResponseType = {} | UsersSeatType