import React from 'react';
import s from './VerifyingEmailPage.module.css';
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button";

function VerifyingEmailPage() {
    return (
        <div className={s.VerifyingEmailPage}>
            <h1 className={s.VerifyingEmailPage_Header}>Welcome! Verify your account.</h1>
            <p className={s.VerifyingEmailPage_Info}>We sent you a verification link. <br/> Check your email and follow the instructions.</p>
            <p className={s.VerifyingEmailPage_Notice}>Check your SPAM folder, if you didn't receive an email from StyleScan</p>
            <Link to={'/'}>
                <Button className={s.VerifyingEmailPage_Btn}>Home Page</Button>
            </Link>
        </div>
    );
}

export default VerifyingEmailPage;