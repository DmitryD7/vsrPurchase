import React from 'react';
import successIco from '../../assets/successIco.svg'
import s from './SuccessPage.module.css';
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button";

function SuccessPage() {
    return (
        <div className={s.SuccessPage}>
            <img src={successIco} alt="success" className={s.SuccessIco}/>
            <h2 className={s.SuccessHeader}>Payment successful!</h2>
            <p className={s.SuccessInfo}>Thanks for your purchase. Invoice has been sent to your email.</p>
            <Link to={'/'}>
                <Button>Go Back</Button>
            </Link>
        </div>
    );
}

export default SuccessPage;