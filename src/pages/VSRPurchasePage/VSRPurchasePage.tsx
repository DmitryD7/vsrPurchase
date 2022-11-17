import React from 'react';
import s from './VSRPurchasePage.module.css';
import {FormikHelpers, useFormik} from "formik";
import {goToURL, numberOfUsersValidate, useAppDispatch} from "../../utils/utils";
import {accountActions} from "../../app/accountReducer";
import {Navigate} from "react-router-dom";
import {Loader} from "../../components/Loader/Loader";
import {appSelectors} from "../../app/appReducer";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../app/authReducer";

function VSRPurchasePage() {
    const dispatch = useAppDispatch();
    const {buySeats} = accountActions;
    const {selectStatus} = appSelectors;
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const status = useSelector(selectStatus);

    const validate = (values: { numberOfUsers: number }) => {
        const errors: ErrorFormValuesType = {};
        errors.numberOfUsers = numberOfUsersValidate(values.numberOfUsers)

        return errors.numberOfUsers ? errors : {};
    };

    const formik = useFormik({
        initialValues: {
            numberOfUsers: 5,
        },
        validate,
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            const res = await dispatch(buySeats({seats: values.numberOfUsers}));
            if (!res.payload?.error) {
                const billingPortal = res.payload;
                goToURL(billingPortal)
            }
            else if (res.payload?.error) {
                const error = res.payload.error;
                formikHelpers.setFieldError('numberOfUsers', error);
            }
        },
    });

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    if (status === "loading") {
        return <Loader/>
    }

    return (
        <div className={s.LoginPage}>
            <h1 className={s.LoginPage_Header}>VSR Purchase Page</h1>

            <section className={s.LoginPage_NewAcc}>
                <p>$99 per user</p>
                <p>5 user minimum</p>
            </section>

            <div className={s.LoginPage_Form}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.LoginPage_Form_Element}>
                        <label htmlFor="numberOfUsers">Desired Number of Users: </label>
                        <input
                            type="number"
                            placeholder={'Number of users'}
                            {...formik.getFieldProps('numberOfUsers')}
                        />
                        {formik.errors.numberOfUsers ?
                            <div className={s.LoginPage_Form_Element_Error}>{formik.errors.numberOfUsers}</div> : null}
                    </div>

                    <button className={s.LoginPage_Form_Btn} type={"submit"}>Subscribe</button>
                </form>
            </div>
        </div>
    );
}

export default VSRPurchasePage;

type FormValuesType = {
    numberOfUsers: number;
}

type ErrorFormValuesType = {
    numberOfUsers?: string;
}