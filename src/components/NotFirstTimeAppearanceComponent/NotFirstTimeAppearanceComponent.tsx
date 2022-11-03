import s from "./NotFirstTimeAppearanceComponent.module.css";
import React, {useState} from "react";
import {SendEmailToSeatParamsType, SetSeatParamsType, UsersSeatType} from "../../api/api";
import {useClipboard} from "use-clipboard-copy";
import {FirstTimeAppearanceComponent} from "../FirstTimeAppearanceComponent/FirstTimeAppearanceComponent";

export const NotFirstTimeAppearanceComponent = (props: NotFirstTimeAppearanceComponentPropsType) => {
    const clipboard = useClipboard();
    const [isEditing, setIsEditing] = useState(false);

    const {index, seat, onSendEmailToSeat, onSetSeatEmailClick} = props;
    const {sURL, sEmail} = seat;

    const onEmailClickHandler = () => {
        onSendEmailToSeat({iSeatNumber: index});
        console.log(`onEmailClick  seatIndex: ${index}, seatEmail: ${sEmail}`);
    };
    const onCopyUrlClickHandler = () => {
        clipboard.copy(sURL)
        console.log(`onCopyUrlClick seatIndex: ${index} sUrl: ${sURL}`);
    };
    const onEmailChangeHandler = () => {
        setIsEditing(true);
    };

    return (
        <>
            {!isEditing
                ? <section>
                    <div className={s.NotFirstTime_Element}>
                        <input type="email" defaultValue={sEmail} onChange={onEmailChangeHandler}/>
                        <div className={s.NotFirstTime_Element_Buttons}>
                            <button className={s.Btn} onClick={onEmailClickHandler}>Email</button>
                            <button className={s.Btn} onClick={onCopyUrlClickHandler}>Copy URL</button>
                        </div>
                    </div>
                </section>
                : <FirstTimeAppearanceComponent onSetSeatEmailClick={onSetSeatEmailClick} index={index} value={sEmail}/>
            }
        </>
    )
}

type NotFirstTimeAppearanceComponentPropsType = {
    index: number
    seat: UsersSeatType
    onSendEmailToSeat: (params: SendEmailToSeatParamsType) => void
    onSetSeatEmailClick: (params: SetSeatParamsType) => void
}