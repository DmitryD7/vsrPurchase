import React, {useEffect} from 'react';
import s from './App.module.css';
import {useAppDispatch} from "./utils/utils";
import {appActions} from "./app/appReducer";
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

function App() {
    const dispatch = useAppDispatch();
    const {initializeApp} = appActions;
    const {fetchSeats} = accountActions;
    const {selectSeats} = accSelectors;
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const seats = useSelector(selectSeats);

    useEffect(() => {
        dispatch(initializeApp());
        if (isLoggedIn){
            dispatch(fetchSeats())
        }
    }, [dispatch, initializeApp, fetchSeats]);

    // if (status === "loading") {
    //     return <Loader/>
    // }

    const StartPage = () => seats.length > 0 ? <AccountPage/> : <VSRPurchasePage/>;

    return (
        <div className={s.Container}>
            <div className={s.App}>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<StartPage/>}/>
                    <Route path={'account'} element={<AccountPage/>}/>
                    <Route path={'purchase'} element={<VSRPurchasePage/>}/>
                    <Route path={'success'} element={<SuccessPage/>}/>
                    <Route path={'cancel'} element={<CancellationPage/>}/>
                    <Route path={'login'} element={<LoginPage/>}/>
                    <Route path={'signup'} element={<SignupPage/>}/>
                    <Route path={'verify'} element={<VerifyingEmailPage/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
