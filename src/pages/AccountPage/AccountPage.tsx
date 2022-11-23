import React, {useCallback, useEffect, useMemo} from 'react';
import s from './AccountPage.module.css';
import {goToURL, useAppDispatch} from "../../utils/utils";
import {authActions, selectIsLoggedIn} from "../../app/authReducer";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Loader} from "../../components/Loader/Loader";
import {accountActions, accSelectors} from "../../app/accountReducer";
import {SendEmailToSeatParamsType, SetSeatParamsType} from "../../api/api";
import {ExportToCsv} from "export-to-csv";
import {MemoizedSeatsTable} from "../../components/SeatsTable/SeatsTable";
import {appSelectors} from "../../app/appReducer";

function AccountPage() {
    const dispatch = useAppDispatch();

    const {logout} = authActions;

    const {selectStatus} = appSelectors;
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const status = useSelector(selectStatus);

    const {selectSeats, selectPayment, selectAccEmail} = accSelectors;
    const seatsList = useSelector(selectSeats);
    const accEmail = useSelector(selectAccEmail);
    const payment = useSelector(selectPayment);

    const {fetchSeats, sendEmailToAllSeats, sendEmailToSeat, setSeat, buySeats} = accountActions;

    const {debug, getPayment} = accountActions;

    useEffect(() => {
        dispatch(debug());
        dispatch(fetchSeats());
    }, [dispatch, debug, fetchSeats]);

    const onLogoutHandler = useCallback(async () => {
        await dispatch(logout());
    }, [dispatch, logout])

    const onStripeManageHandler = useCallback(async () => {
        const res = await dispatch(getPayment({url: 'https://vsrpurchase-test.web.app/'}));
        const billingUrl = res.payload;
        goToURL(billingUrl);
    }, [dispatch, getPayment]);

    const onSetSeatEmailClick = useCallback(async (params: SetSeatParamsType) => {
        await dispatch(setSeat(params));
    }, [dispatch, setSeat]);

    const onSendEmailToSeat = useCallback(async (params: SendEmailToSeatParamsType) => {
        await dispatch(sendEmailToSeat(params));
    }, [dispatch, sendEmailToSeat]);

    const onEmailAllClickHandler = async () => {
        await dispatch(sendEmailToAllSeats());
    };

    const onConfigureSeatsHandler = useCallback(async (numberOfUsers: number = 5) => {
        const res = await dispatch(buySeats({seats: numberOfUsers, url: 'https://vsrpurchase-test.web.app/'}));
        if (!res.payload?.error) {
            const billingPortal = res.payload;
            goToURL(billingPortal)
        }
    }, [dispatch, buySeats])

    const csvExporter = useMemo(() => {
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
        return new ExportToCsv(options)
    }, []);

    const onDownloadCSVClickHandler = useCallback(() => {
        csvExporter.generateCsv(seatsList);
    }, [csvExporter, seatsList])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    if (status === "loading") {
        return <Loader/>
    }
    if (seatsList.length === 0) {
        return <Navigate to={'/purchase'}/>
    }

    return (
        <div className={s.AccountPage}>
            <h1>Hello {accEmail}!</h1>
            <div className={s.AccountPage_Data}>
                {seatsList.length > 0
                    && <section className={s.AccountPage_ManageSection}>
                        <>
                            <h3>Manage your seats</h3>
                            {seatsList.length > 0 &&
                                <div className={s.NotFirstTime_Buttons}>
                                    <button className={s.Btn} onClick={onEmailAllClickHandler}>Email All</button>
                                    <button className={s.Btn} onClick={onDownloadCSVClickHandler}>Download CSV</button>
                                </div>
                            }
                            <MemoizedSeatsTable
                                onSetSeatEmailClick={onSetSeatEmailClick}
                                seatsList={seatsList}
                                onSendEmailToSeat={onSendEmailToSeat}
                                onConfigureSeatsHandler={onConfigureSeatsHandler}
                            />
                        </>
                    </section>
                }

                <section className={s.AccountPage_Settings}>
                    <h3>Account settings</h3>
                    {payment &&
                        <button className={s.Btn} onClick={onStripeManageHandler}>
                            Manage Payment
                        </button>
                    }
                    <button onClick={onLogoutHandler} className={s.Btn}>Logout</button>
                </section>
            </div>
        </div>
    );
}

export default AccountPage;
