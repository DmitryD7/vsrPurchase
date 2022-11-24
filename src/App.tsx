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
import {Loader} from "./components/Loader/Loader";
import {appCommonActions} from "./app/applicationCommonActions";
import ResetPasswPage from "./pages/ResetPasswPage/ResetPasswPage";
import ChangePasswPage from "./pages/ChangePasswPage/ChangePasswPage";

function App() {
    const dispatch = useAppDispatch();
    const {selectStatus, selectError} = appSelectors;
    const {initializeApp} = appActions;
    const {fetchSeats,} = accountActions;
    const {setAppError} = appCommonActions;
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const error = useSelector(selectError);
    const status = useSelector(selectStatus);
    const alert = useAlert();

    useEffect(() => {
        dispatch(initializeApp());
        isLoggedIn && dispatch(fetchSeats())
    }, [dispatch, initializeApp, fetchSeats, isLoggedIn]);

    const showError = useCallback((error: string | null) => {
        alert.error(error);
        dispatch(setAppError({error: null}))
    }, [alert, dispatch, setAppError])

    return (
        <div className={s.Container}>
            <div className={s.App}>
                <>
                    {isLoggedIn && error && showError(error)}
                    <Header/>
                    {status === "loading" && <Loader/>}
                    <Routes>
                        <Route path={'/'} element={<StartPage isLoggedIn={isLoggedIn}/>}/>
                        <Route path={'account'} element={<AccountPage/>}/>
                        <Route path={'purchase'} element={<VSRPurchasePage/>}/>
                        <Route path={'success'} element={<SuccessPage/>}/>
                        <Route path={'cancel'} element={<CancellationPage/>}/>
                        <Route path={'login'} element={<LoginPage/>}/>
                        <Route path={'signup'} element={<SignupPage/>}/>
                        <Route path={'verify'} element={<VerifyingEmailPage/>}/>
                        <Route path={'reset_request'} element={<ResetPasswPage/>}/>
                        <Route path={'reset_password'} element={<ChangePasswPage/>}/>
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
