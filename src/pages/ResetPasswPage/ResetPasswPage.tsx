import React from 'react';
import s from './ResetPasswPage.module.css';
import {emailValidate, useAppDispatch} from "../../utils/utils";
import {FormErrorType} from "../../app/types";
import {FormikHelpers, useFormik} from "formik";
import {authActions} from "../../app/authReducer";
import {useNavigate} from "react-router-dom";

function ResetPasswPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const renderChangePasswordPage = () => navigate('/reset_password');

    const validate = (values: FormValuesType) => {
        const errors: FormErrorType = {};
        errors.email = emailValidate(values.email);
        return errors.email ? errors : {}
    };

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate,
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
           const res = await dispatch(authActions.requestResetPassword(values));
            if (res.payload?.error) {
                const error = res.payload.error;
                formikHelpers.setFieldError('email', error);
            } else {
                renderChangePasswordPage();
            }
        },
    });

    return (
        <div className={s.ResetPasswPage}>
            <h1 className={s.ResetPasswPage_Header}>Reset Password</h1>
            <h3 className={s.ResetPasswPage_Info}>Enter your email address to reset your password.</h3>
            <div className={s.ResetPasswPage_Form}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.ResetPasswPage_Element}>
                        <input
                            type="email"
                            placeholder={'Email'}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ?
                            <div className={s.ResetPasswPage_Element_Error}>{formik.errors.email}</div> : null}
                    </div>
                    <button className={s.ResetPasswPage_Form_Btn} type={"submit"}>Reset Password</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPasswPage;

type FormValuesType = {
    email: string
}