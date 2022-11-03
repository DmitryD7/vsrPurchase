import s from "./FirstTimeAppearanceComponent.module.css";
import React, {ChangeEvent, useState} from "react";
import {SetSeatParamsType} from "../../api/api";

export const FirstTimeAppearanceComponent = (props: FirstTimeAppearanceComponentPropsType) => {
    const {index, onSetSeatEmailClick, value} = props;

    const [seatEmail, setSeatEmail] = useState(value ? value : '');

    const onSeatEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setSeatEmail(e.target.value);

    const onSetSeatEmailClickHandler = () => {
        onSetSeatEmailClick({sEmail: seatEmail, iSeatNumber: index});
        console.log(`onSetSeatEmailClick  sEmail: ${seatEmail}, index: ${index}`);
    };

    return (
        <section>
            <div className={s.FirstTimeAppearanceComponent}>
                <input type="email" value={seatEmail} onChange={onSeatEmailChangeHandler} autoFocus/>
                <button className={s.Btn} onClick={onSetSeatEmailClickHandler}>Set Seat</button>
            </div>
        </section>
    );
}

type FirstTimeAppearanceComponentPropsType = {
    index: number
    onSetSeatEmailClick: (params: SetSeatParamsType) => void
    value?: string
}