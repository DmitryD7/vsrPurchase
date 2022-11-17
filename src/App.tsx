import React, {useCallback, useEffect} from 'react';
import s from './App.module.css';
import {useAppDispatch} from "./utils/utils";
import {appActions, appSelectors} from "./app/appReducer";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom';
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import CancellationPage from "./pages/CancellationPage/CancellationPage";
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import VerifyingEmailPage from "./pages/VerifyingEmailPage/VerifyingEmailPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import VSRPurchasePage from "./pages/VSRPurchasePage/VSRPurchasePage";
import {useSelector} from "react-redux";
import {accountActions, accSelectors} from "./app/accountReducer";
import {selectIsLoggedIn} from "./app/authReducer";
import {useAlert} from "react-alert";

function App() {
    const dispatch = useAppDispatch();
    const {initializeApp} = appActions;
    const {fetchSeats} = accountActions;
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const error = useSelector(appSelectors.selectError);
    const alert = useAlert();

    useEffect(() => {
        dispatch(initializeApp());
        isLoggedIn && dispatch(fetchSeats())
    }, [dispatch, initializeApp, fetchSeats, isLoggedIn]);

    // if (status === "loading") {
    //     return <Loader/>
    // }

    const showError = useCallback((error: any) => {
        alert.error(error)
    }, [alert])


    return (
        <div className={s.Container}>
            <div className={s.App}>
                <>
                    {error && showError(error)}
                    <Header/>
                    <Routes>
                        <Route path={'/'} element={<StartPage isLoggedIn={isLoggedIn}/>}/>
                        <Route path={'account'} element={<AccountPage/>}/>
                        <Route path={'purchase'} element={<VSRPurchasePage/>}/>
                        <Route path={'success'} element={<SuccessPage/>}/>
                        <Route path={'cancel'} element={<CancellationPage/>}/>
                        <Route path={'login'} element={<LoginPage/>}/>
                        <Route path={'signup'} element={<SignupPage/>}/>
                        <Route path={'verify'} element={<VerifyingEmailPage/>}/>
                    </Routes>
                </>
            </div>
        </div>
    );
}

const StartPage = (props: { isLoggedIn: boolean }) => {
    const {selectSeats} = accSelectors;
    const seatsList = useSelector(selectSeats);

    if (!props.isLoggedIn) {
        return <LoginPage/>
    } else if (seatsList.length === 0) {
        return <VSRPurchasePage/>
    } else {
        return <AccountPage/>
    }
}

export default App;
