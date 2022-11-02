import React from 'react';
import s from './SignupPage.module.css';
import {FormikHelpers, useFormik} from "formik";
import {Link, useNavigate} from 'react-router-dom';
import {emailValidate, passwordConfirmValidate, passwordValidate, useAppDispatch} from "../../utils/utils";
import {FormErrorType} from "../../app/types";
import {authActions} from "../../app/authReducer";
import {useSelector} from "react-redux";
import {selectStatus} from "../../app/appReducer";
import {Loader} from "../../components/Loader/Loader";

function SignupPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const status = useSelector(selectStatus);

    const validate = (values: FormValuesType) => {
        const errors: FormErrorType = {};
        errors.email = emailValidate(values.email)
        errors.password = passwordValidate(values.password)
        errors.passwordConfirmation = passwordConfirmValidate(values.passwordConfirmation, values.password)

        return errors.email || errors.password || errors.passwordConfirmation ? errors : {}
    };

    const renderVerifyPage = () => navigate('/verify')

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        validate,
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            const {email, password} = values;
            const res = await dispatch(authActions.signup({email, password}));
            if (res.payload?.error) {
                const error = res.payload.error;
                formikHelpers.setFieldError('email', error);
            } else {
                renderVerifyPage()
            }
        },
    });

    if (status === "loading") {
        return <Loader/>
    }

    return (
        <div className={s.LoginPage}>
            <h1 className={s.LoginPage_Header}>Signup</h1>
            <Link to={'/login'} className={s.LoginPage_NewAcc}>Already have an account?</Link>
            <div className={s.LoginPage_Form}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.LoginPage_Form_Element}>
                        <input
                            type="email"
                            placeholder={'Email'}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ?
                            <div className={s.LoginPage_Form_Element_Error}>{formik.errors.email}</div> : null}
                    </div>

                    <div className={s.LoginPage_Form_Element}>
                        <input
                            type="password"
                            placeholder={'Password'}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ?
                            <div className={s.LoginPage_Form_Element_Error}>{formik.errors.password}</div> : null}
                    </div>

                    <div className={s.LoginPage_Form_Element}>
                        <input
                            type="password"
                            placeholder={'Confirm your password'}
                            {...formik.getFieldProps('passwordConfirmation')}
                        />
                        {formik.errors.passwordConfirmation ? <div
                            className={s.LoginPage_Form_Element_Error}>{formik.errors.passwordConfirmation}</div> : null}
                    </div>

                    <button className={s.LoginPage_Form_Btn} type={"submit"}>Signup</button>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;

type FormValuesType = {
    email: string
    password: string
    passwordConfirmation: string
}