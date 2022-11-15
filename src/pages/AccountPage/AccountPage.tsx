import React, {useEffect} from 'react';
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
import {ExportToCsv} from "export-to-csv";

function AccountPage() {
    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const status = useSelector(selectStatus);

    const {selectSeats} = accSelectors;
    const seatsList = useSelector(selectSeats);

    const {fetchSeats, sendEmailToAllSeats, sendEmailToSeat, setSeat} = accountActions;

    const {selectAccEmail} = accSelectors;
    const accEmail = useSelector(selectAccEmail);

    const {debug} = accountActions;

    useEffect(() => {
        dispatch(debug());
        dispatch(fetchSeats);
    }, [dispatch, debug, fetchSeats]);

    const onLogoutHandler = async () => {
        const res = await dispatch(authActions.logout());
        if (res.payload?.error) {
            const error = res.payload.error;
            alert(error)
        }
    }

    const onSetSeatEmailClick = (params: SetSeatParamsType) => {
        console.log(params)
        dispatch(setSeat(params));
    };

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

    // const renderFirstTime = () => inputsListForFirstTimeAppearance.map((num) => <FirstTimeAppearanceComponent
    //     index={num}
    //     key={num}
    //     onSetSeatEmailClick={onSetSeatEmailClick}
    // />);
    //
    // const renderNotFirstTime = () => seatsList.map((seat: UsersSeatType | {}, i) =>
    //     <NotFirstTimeAppearanceComponent
    //         key={seat.email}
    //         index={i}
    //         seat={seat}
    //         onSendEmailToSeat={onSendEmailToSeat}
    //         onSetSeatEmailClick={onSetSeatEmailClick}
    //     />
    // );

    /*
    ? <NotFirstTimeAppearanceComponent
        key={seat.email}
        index={i}
        seat={seat}
        onSendEmailToSeat={onSendEmailToSeat}
        onSetSeatEmailClick={onSetSeatEmailClick}
    />
    : <FirstTimeAppearanceComponent
        index={i}
        key={i}
        onSetSeatEmailClick={onSetSeatEmailClick}
    />
    */

    // @ts-ignore
    const render = () => seatsList.map((seat: UsersSeatType, i) => {
        // @ts-ignore
        return (
            <>
                {seat.hasOwnProperty('email')
                    ? <NotFirstTimeAppearanceComponent
                        key={seat.email}
                        index={i + 1}
                        seat={seat}
                        onSendEmailToSeat={onSendEmailToSeat}
                        onSetSeatEmailClick={onSetSeatEmailClick}
                    />
                    : <FirstTimeAppearanceComponent
                        index={i + 1}
                        key={i}
                        onSetSeatEmailClick={onSetSeatEmailClick}
                    />
                }
            </>
        )
    });

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
                {seatsList.length > 0 && <div className={s.AccountPage_ManageSection}>
                    <>
                        <h3>{seatsList.length > 0 ? 'Manage your seats' : 'Fill in an email address for each seat'}</h3>
                        {seatsList.length > 0 &&
                            <div className={s.NotFirstTime_Buttons}>
                                <button className={s.Btn} onClick={onEmailAllClickHandler}>Email All</button>
                                <button className={s.Btn} onClick={onDownloadCSVClickHandler}>Download CSV</button>
                            </div>}
                        {render()}
                    </>
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
