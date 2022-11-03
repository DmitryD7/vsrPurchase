import s from "./NotFirstTimeAppearanceComponent.module.css";
import React from "react";
import {UsersSeatType} from "../../api/api";

export const NotFirstTimeAppearanceComponent = (props: NotFirstTimeAppearanceComponentPropsType) => {
    const {index, dispatch, seat} = props;
    const {sURL, sEmail} = seat;

    const onEmailClickHandler = () => console.log(`onEmailClick  seatIndex: ${index}`);
    const onCopyUrlClickHandler = () => console.log(`onCopyUrlClick seatIndex: ${index} sUrl: ${sURL}`);

    return (
        <section>
            <div className={s.NotFirstTime_Element}>
                <input type="email" defaultValue={sEmail} disabled/>
                <div className={s.NotFirstTime_Element_Buttons}>
                    <button className={s.Btn} onClick={onEmailClickHandler}>Email</button>
                    <button className={s.Btn} onClick={onCopyUrlClickHandler}>Copy URL</button>
                </div>
            </div>
        </section>
    );
}

type NotFirstTimeAppearanceComponentPropsType = {
    index: number
    dispatch: any
    seat: UsersSeatType
}