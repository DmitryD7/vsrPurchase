import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './AccountPage.module.css';
import {useAppDispatch} from "../../utils/utils";
import {authActions, selectIsLoggedIn} from "../../app/authReducer";
import {Link, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectStatus} from "../../app/appReducer";
import {Loader} from "../../components/Loader/Loader";
import {accountActions, accSelectors} from "../../app/accountReducer";

function AccountPage() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const status = useSelector(selectStatus);

    let seatsNumber = 1;

    const {selectAccEmail} = accSelectors;
    const accEmail = useSelector(selectAccEmail);

    const {debug} = accountActions;

    useEffect(() => {
        dispatch(debug());
    }, [dispatch, debug]);

    const onLogoutHandler = async () => {
        const res = await dispatch(authActions.logout());
        if (res.payload?.error) {
            const error = res.payload.error;
            alert(error)
        }
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    if (status === "loading") {
        return <Loader/>
    }

    return (
        <div className={s.AccountPage}>
            <h1>Hello {accEmail}!</h1>
            <div className={s.AccountPage_Data}>
                {seatsNumber === 0
                    ? <FirstTimeAppearanceComponent/>
                    : <NotFirstTimeAppearanceComponent/>
                }

                <section className={s.AccountPage_Settings}>
                    <h3>Account settings</h3>
                    <button className={`${s.Btn} ${s.Btn_WithLink}`}>
                        <a href="https://billing.stripe.com/p/login/test_7sI6rD4lT672bPGbII">Cancel plan</a>
                    </button>
                    <button className={`${s.Btn} ${s.Btn_WithLink}`}>
                        <a href="https://billing.stripe.com/p/login/test_7sI6rD4lT672bPGbII">Stripe Manage</a>
                    </button>
                    <button onClick={onLogoutHandler} className={s.Btn}>Logout</button>
                </section>
            </div>
        </div>
    );
}

export default AccountPage;

const FirstTimeAppearanceComponent = () => {
    const [seatEmail, setSeatEmail] = useState('');
    const onSeatEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setSeatEmail(e.target.value);
    const onSetSeatEmailClickHandler = () => console.log(seatEmail);

    return (
        <section className={s.AccountPage_PlanInfo}>
            <h3>Fill in an email address for each seat</h3>
            <div className={s.AccountPage_Seat_Element}>
                <input type="email" value={seatEmail} onChange={onSeatEmailChangeHandler}/>
                <button className={s.Btn} onClick={onSetSeatEmailClickHandler}>Set Seat</button>
            </div>
        </section>
    );
}

const NotFirstTimeAppearanceComponent = () => {
    const [seatEmail, setSeatEmail] = useState('');
    const onSeatEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setSeatEmail(e.target.value);
    const onEmailClickHandler = () => console.log('onEmailClick');
    const onCopyUrlClickHandler = () => console.log('onCopyUrlClick');
    const onEmailAllClickHandler = () => console.log('onEmailAllClick');
    const onDownloadCSVClickHandler = () => console.log('onDownloadCSVClick');

    return (
        <section className={s.AccountPage_ManageSection}>
            <h3>Manage your seats</h3>
            <div className={s.NotFirstTime_Buttons}>
                <button className={s.Btn} onClick={onEmailAllClickHandler}>Email All</button>
                <button className={s.Btn} onClick={onDownloadCSVClickHandler}>Download CSV</button>
            </div>
            <div className={s.NotFirstTime_Element}>
                <input type="email" value={seatEmail} onChange={onSeatEmailChangeHandler}/>
                <div className={s.NotFirstTime_Element_Buttons}>
                    <button className={s.Btn} onClick={onEmailClickHandler}>Email</button>
                    <button className={s.Btn} onClick={onCopyUrlClickHandler}>Copy URL</button>
                </div>
            </div>
        </section>
    );
}