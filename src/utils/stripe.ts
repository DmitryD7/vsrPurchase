import {loadStripe} from "@stripe/stripe-js";
import {appCommonActions} from "../app/applicationCommonActions";

let stripePromise: any;

export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY as string)
    }

    return stripePromise;
};

export const redirectToCheckout = (dispatch: any) => async (item: { price: string, quantity: number }) => {
    const {setAppStatus, setAppError} = appCommonActions;

    const checkoutOptions = {
        lineItems: [item],
        mode: 'subscription',
        clientReferenceId: 'helloFromLocal',
        // customerEmail: 'di@gmail.com',
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`
    };

    dispatch(setAppStatus({status: "loading"}))
    const stripe = await getStripe();
    const {error} = await stripe.redirectToCheckout(checkoutOptions);

    if (error) {
        dispatch(setAppError({error: error.message}))
        dispatch(setAppStatus({status: "failed"}))
    }
    dispatch(setAppStatus({status: "idle"}))
};