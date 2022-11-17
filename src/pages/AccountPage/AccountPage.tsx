import React, {useEffect} from 'react';
import s from './AccountPage.module.css';
import {goToURL, useAppDispatch} from "../../utils/utils";
import {authActions, selectIsLoggedIn} from "../../app/authReducer";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Loader} from "../../components/Loader/Loader";
import {accountActions, accSelectors} from "../../app/accountReducer";
import {SendEmailToSeatParamsType, SetSeatParamsType} from "../../api/api";
import {ExportToCsv} from "export-to-csv";
import SeatsTable from "../../components/SeatsTable/SeatsTable";
import {appSelectors} from "../../app/appReducer";

function AccountPage() {
    const dispatch = useAppDispatch();
    const {selectStatus} = appSelectors;

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const status = useSelector(selectStatus);

    const {selectSeats, selectPayment, selectAccEmail} = accSelectors;
    const seatsList = useSelector(selectSeats);
    const accEmail = useSelector(selectAccEmail);
    const payment = useSelector(selectPayment);

    const {fetchSeats, sendEmailToAllSeats, sendEmailToSeat, setSeat} = accountActions;

    const {debug, getPayment} = accountActions;

    useEffect(() => {
        dispatch(debug());
        dispatch(fetchSeats());
    }, [dispatch, debug, fetchSeats]);

    const onLogoutHandler = async () => {
        const res = await dispatch(authActions.logout());
        if (res.payload?.error) {
            const error = res.payload.error;
            alert(error)
        }
    }

    const onStripeManageHandler = async () => {
        const res = await dispatch(getPayment());
        const billingUrl = res.payload;
        goToURL(billingUrl);
    };

    const onSetSeatEmailClick = async (params: SetSeatParamsType) => await dispatch(setSeat(params));

    const onSendEmailToSeat = (params: SendEmailToSeatParamsType) => {
        dispatch(sendEmailToSeat(params));
    };

    const onEmailAllClickHandler = () => {
        dispatch(sendEmailToAllSeats());
    };

    const options = {
        fieldSeparator: ',',
        filename: 'StyleScan-CSV',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'StyleScan VSR CSV',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);

    const onDownloadCSVClickHandler = () => {
        csvExporter.generateCsv(seatsList);
    };

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    if (status === "loading") {
        return <Loader/>
    }
    if (seatsList.length < 0) {
        return <Navigate to={'/purchase'}/>
    }

    return (
        <div className={s.AccountPage}>
            <h1>Hello {accEmail}!</h1>
            <div className={s.AccountPage_Data}>
                {seatsList.length > 0 && <div className={s.AccountPage_ManageSection}>
                    <>
                        <h3>Manage your seats</h3>
                        {seatsList.length > 0 &&
                            <div className={s.NotFirstTime_Buttons}>
                                <button className={s.Btn} onClick={onEmailAllClickHandler}>Email All</button>
                                <button className={s.Btn} onClick={onDownloadCSVClickHandler}>Download CSV</button>
                            </div>}
                        <SeatsTable
                            onSetSeatEmailClick={onSetSeatEmailClick}
                            seatsList={seatsList}
                            onSendEmailToSeat={onSendEmailToSeat}/>
                    </>
                </div>
                }

                <section className={s.AccountPage_Settings}>
                    <h3>Account settings</h3>
                    {payment && <button className={`${s.Btn} ${s.Btn_WithLink}`} onClick={onStripeManageHandler}>
                        {/*<a href="https://billing.stripe.com/p/login/test_7sI6rD4lT672bPGbII">Manage Payment</a>*/}
                        Manage Payment
                    </button>}
                    <button onClick={onLogoutHandler} className={s.Btn}>Logout</button>
                </section>
            </div>
        </div>
    );
}

export default AccountPage;
