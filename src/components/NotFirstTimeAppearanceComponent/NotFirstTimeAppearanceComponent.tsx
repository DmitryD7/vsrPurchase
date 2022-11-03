import s from "./NotFirstTimeAppearanceComponent.module.css";
import React, {useState} from "react";
import {SendEmailToSeatParamsType, UsersSeatType} from "../../api/api";
import {useClipboard} from "use-clipboard-copy";

export const NotFirstTimeAppearanceComponent = (props: NotFirstTimeAppearanceComponentPropsType) => {
    const clipboard = useClipboard();
    const [newEmail, setNewEmail] = useState('');

    const {index, seat, onSendEmailToSeat} = props;
    const {sURL, sEmail} = seat;

    const onEmailClickHandler = () => {
        onSendEmailToSeat({iSeatNumber: index});
        console.log(`onEmailClick  seatIndex: ${index}, seatEmail: ${sEmail}`);
    };
    const onCopyUrlClickHandler = () => {
        clipboard.copy(sURL)
        console.log(`onCopyUrlClick seatIndex: ${index} sUrl: ${sURL}`);
    };

    return (
        <section>
            <div className={s.NotFirstTime_Element}>
                <input type="email" defaultValue={sEmail} onChange={e => setNewEmail(e.target.value)}/>
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
    seat: UsersSeatType
    onSendEmailToSeat: (params: SendEmailToSeatParamsType) => void
}