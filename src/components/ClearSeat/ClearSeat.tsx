import s from "./ClearSeat.module.css";
import React from "react";
import {SetSeatParamsType} from "../../api/api";
import {FormErrorType} from "../../app/types";
import {notRequiredEmailValidate} from "../../utils/utils";
import {FormikHelpers, useFormik} from "formik";

export const ClearSeat = (props: FirstTimeAppearanceComponentPropsType) => {
    const {index, onSetSeatEmailClick, value} = props;

    const validate = (values: { email: string }) => {
        const errors: FormErrorType = {};
        errors.email = notRequiredEmailValidate(values.email);
        return errors.email ? errors : {};
    };

    const formik = useFormik({
        initialValues: {
            email: value ?? '',
        },
        validate,
        onSubmit: async (values, formikHelpers: FormikHelpers<{ email: string }>) => {
            const res = await onSetSeatEmailClick({email: values.email, index});
            if (res.payload.error) {
                const error = res.payload.error;
                formikHelpers.setFieldError('email', error);
            }
        },
    });

    return (
        <section>
            <div className={s.FirstTimeAppearanceComponent}>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="email"
                        autoFocus
                        {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email
                        ? <div className={s.Email_Error}>{formik.errors.email}</div>
                        : null}
                    <button className={s.Btn} type={'submit'}>Set Seat</button>
                </form>
            </div>
        </section>
    );
}

type FirstTimeAppearanceComponentPropsType = {
    index: number
    // onSetSeatEmailClick: (params: SetSeatParamsType) => Promise<any>
    onSetSeatEmailClick: (params: SetSeatParamsType) => any
    value?: string
}