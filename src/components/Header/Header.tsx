import React from 'react';
import styleScanLogo from '../../assets/Black.png'
import s from './Header.module.css';
import {authActions, selectIsLoggedIn} from "../../app/authReducer";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {accSelectors} from "../../app/accountReducer";
import {useAppDispatch} from "../../utils/utils";

function Header() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const seatsList = useSelector(accSelectors.selectSeats);

    const onLogoutHandler = async () => {
        const res = await dispatch(authActions.logout());
        if (res.payload?.error) {
            const error = res.payload.error;
            alert(error);
        }
    };

    return (
        <div className={s.Header}>
            <div>
                <Link to={'/'}>
                    <img src={styleScanLogo} alt="StyleScan Logo" className={s.Header_StyleScanIco}/>
                </Link>
            </div>
            <div className={s.Header_Account}>
                {isLoggedIn && <Link to={'purchase'}>Purchase</Link>}
                {isLoggedIn
                    ? (seatsList.length === 0
                        ? <button className={s.Header_Account_Btn} onClick={onLogoutHandler}>Logout</button>
                        : <Link to={'account'}>Account</Link>)
                    : <Link to={'login'}>Login</Link>
                }
            </div>
        </div>
    );
}

export default Header;