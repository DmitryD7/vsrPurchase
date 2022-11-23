import s from "./OccupiedSeat.module.css";
import React, {useState} from "react";
import {SendEmailToSeatParamsType, SetSeatParamsType, UsersSeatType} from "../../api/api";
import {useClipboard} from "use-clipboard-copy";
import {ClearSeat} from "../ClearSeat/ClearSeat";

export const OccupiedSeat = (props: OccupiedSeatPropsType) => {
    const clipboard = useClipboard();
    const [isEditing, setIsEditing] = useState(false);

    const {index, seat, onSendEmailToSeat, onSetSeatEmailClick} = props;
    const {url, email} = seat;

    const onEmailClickHandler = () => {
        onSendEmailToSeat({index});
    };
    const onCopyUrlClickHandler = () => {
        clipboard.copy(url)
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
                : <ClearSeat onSetSeatEmailClick={onSetSeatEmailClick} index={index} value={email}/>
            }
        </>
    )
}

type OccupiedSeatPropsType = {
    index: number
    seat: UsersSeatType
    onSendEmailToSeat: (params: SendEmailToSeatParamsType) => void
    onSetSeatEmailClick: (params: SetSeatParamsType) => void
}