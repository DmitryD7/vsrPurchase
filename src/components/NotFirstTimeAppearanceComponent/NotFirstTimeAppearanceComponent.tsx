import s from "./NotFirstTimeAppearanceComponent.module.css";
import React, {useState} from "react";
import {SendEmailToSeatParamsType, SetSeatParamsType, UsersSeatType} from "../../api/api";
import {useClipboard} from "use-clipboard-copy";
import {FirstTimeAppearanceComponent} from "../FirstTimeAppearanceComponent/FirstTimeAppearanceComponent";

export const NotFirstTimeAppearanceComponent = (props: NotFirstTimeAppearanceComponentPropsType) => {
    const clipboard = useClipboard();
    const [isEditing, setIsEditing] = useState(false);

    const {index, seat, onSendEmailToSeat, onSetSeatEmailClick} = props;
    const {url, email} = seat;

    const onEmailClickHandler = () => {
        onSendEmailToSeat({index});
        console.log(`onEmailClick  seatIndex: ${index}, seatEmail: ${email}`);
    };
    const onCopyUrlClickHandler = () => {
        clipboard.copy(url)
        console.log(`onCopyUrlClick seatIndex: ${index} sUrl: ${url}`);
    };
    const onEmailChangeHandler = () => {
        setIsEditing(true);
    };

    return (
        <>
            {!isEditing
                ? <section>
                    <div className={s.NotFirstTime_Element}>
                        <input type="email" defaultValue={email} onChange={onEmailChangeHandler}/>
                        <div className={s.NotFirstTime_Element_Buttons}>
                            <button className={s.Btn} onClick={onEmailClickHandler}>Email</button>
                            <button className={s.Btn} onClick={onCopyUrlClickHandler}>Copy URL</button>
                        </div>
                    </div>
                </section>
                : <FirstTimeAppearanceComponent onSetSeatEmailClick={onSetSeatEmailClick} index={index} value={email}/>
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