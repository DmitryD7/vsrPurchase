import React from 'react';
import s from './ChangePasswPage.module.css';
import {FormikHelpers, useFormik} from "formik";
import {useNavigate} from 'react-router-dom';
import {passwordConfirmValidate, passwordValidate, useAppDispatch} from "../../utils/utils";
import {FormErrorType} from "../../app/types";
import {authActions} from "../../app/authReducer";

function ChangePasswPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {changePassword} = authActions;

    const validate = (values: FormValuesType) => {
        const errors: FormErrorType = {};
        errors.password = passwordValidate(values.password);
        errors.passwordConfirmation = passwordConfirmValidate(values.passwordConfirmation, values.password);

        return errors.password || errors.passwordConfirmation ? errors : {};
    };

    const renderVerifyPage = () => navigate('/account')

    const formik = useFormik({
        initialValues: {
            confirmCode: '',
            password: '',
            passwordConfirmation: '',
        },
        validate,
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            const {confirmCode, password} = values;
            const res = await dispatch(changePassword({code: confirmCode, password}));
            if (res.payload?.error) {
                const error = res.payload.error;
                formikHelpers.setFieldError('confirmCode', error);
            } else {
                renderVerifyPage()
            }
        },
    });

    return (
        <div className={s.ChangePasswPage}>
            <h1 className={s.ChangePasswPage_Header}>Create New Password</h1>
            <div className={s.ChangePasswPage_Form}>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className={s.ChangePasswPage_Form_Element}>
                        <input
                            autoComplete="new-password"
                            type="text"
                            placeholder={'Code'}
                            {...formik.getFieldProps('confirmCode')}
                        />
                        {formik.errors.confirmCode ?
                            <div
                                className={s.ChangePasswPage_Form_Element_Error}>{formik.errors.confirmCode}</div> : null}
                    </div>

                    <div className={s.ChangePasswPage_Form_Element}>
                        <input
                            autoComplete="new-password"
                            type="password"
                            placeholder={'New Password'}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ?
                            <div className={s.ChangePasswPage_Form_Element_Error}>{formik.errors.password}</div> : null}
                    </div>

                    <div className={s.ChangePasswPage_Form_Element}>
                        <input
                            autoComplete="new-password"
                            type="password"
                            placeholder={'Confirm your password'}
                            {...formik.getFieldProps('passwordConfirmation')}
                        />
                        {formik.errors.passwordConfirmation ? <div
                            className={s.ChangePasswPage_Form_Element_Error}>{formik.errors.passwordConfirmation}</div> : null}
                    </div>

                    <button className={s.ChangePasswPage_Form_Btn} type={"submit"}>Confirm</button>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswPage;

type FormValuesType = {
    password: string
    confirmCode: string
    passwordConfirmation: string
}