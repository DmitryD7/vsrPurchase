import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './AccountPage.module.css';
import {useAppDispatch} from "../../utils/utils";
import {authActions, selectIsLoggedIn} from "../../app/authReducer";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectStatus} from "../../app/appReducer";
import {Loader} from "../../components/Loader/Loader";
import {accountActions, accSelectors} from "../../app/accountReducer";
import {
    NotFirstTimeAppearanceComponent
} from "../../components/NotFirstTimeAppearanceComponent/NotFirstTimeAppearanceComponent";
import {FirstTimeAppearanceComponent} from "../../components/FirstTimeAppearanceComponent/FirstTimeAppearanceComponent";
import {SendEmailToSeatParamsType, SetSeatParamsType, UsersSeatType} from "../../api/api";

function AccountPage() {
    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const status = useSelector(selectStatus);

    const {selectNumberOfSeats, selectSeats} = accSelectors;
    const numberOfSeats = useSelector(selectNumberOfSeats);
    const seatsList = useSelector(selectSeats);

    const {fetchSeats, sendEmailToAllSeats, sendEmailToSeat, setSeat} = accountActions;

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

    const inputsListForFirstTimeAppearance = Array.from(Array(numberOfSeats), (_, i) => i+1);

    const onSetSeatEmailClick = (params: SetSeatParamsType) => {
        dispatch(setSeat(params))
    };

    const onSendEmailToSeat = (params: SendEmailToSeatParamsType) => {
        dispatch(sendEmailToSeat(params));
    };

    const onEmailAllClickHandler = () => console.log('onEmailAllClick');
    const onDownloadCSVClickHandler = () => console.log('onDownloadCSVClick');

    const renderFirstTime = () => inputsListForFirstTimeAppearance.map((num) => <FirstTimeAppearanceComponent index={num} key={num} onSetSeatEmailClick={onSetSeatEmailClick}/>)

    const renderNotFirstTime = () => seatsList.map((seat: UsersSeatType, i) => <NotFirstTimeAppearanceComponent
        key={seat.sEmail}
        index={i}
        seat={seat}
        onSendEmailToSeat={onSendEmailToSeat}
    />)

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
                {numberOfSeats !== 0
                    && <div className={s.AccountPage_ManageSection}>
                        <h3>{seatsList.length > 0 ? 'Manage your seats' : 'Fill in an email address for each seat'}</h3>
                        {seatsList.length > 0 && <div className={s.NotFirstTime_Buttons}>
                            <button className={s.Btn} onClick={onEmailAllClickHandler}>Email All</button>
                            <button className={s.Btn} onClick={onDownloadCSVClickHandler}>Download CSV</button>
                        </div>}
                        {seatsList.length > 0
                            ? renderNotFirstTime()
                            : renderFirstTime()
                        }
                    </div>
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
