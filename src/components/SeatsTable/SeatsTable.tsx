import React, {ChangeEvent, useState} from 'react';
import s from './SeatsTable.module.css';
import {ClearSeat} from "../ClearSeat/ClearSeat";
import {SendEmailToSeatParamsType, SetSeatParamsType, UsersSeatType} from "../../api/api";
import {OccupiedSeat} from "../OccupiedSeat/OccupiedSeat";

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes {
}

function SeatsTable(props: SeatsTablePropsType) {
    const {
        seatsList,
        onSetSeatEmailClick,
        onSendEmailToSeat,
        onConfigureSeatsHandler,
    } = props;

    const [numberOfSeats, setNumberOfSeats] = useState(5);

    const onNumberOfSeatChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNumberOfSeats(+e.target.value);
    };

    const onConfigureSeatsClickHandler = () => {
        onConfigureSeatsHandler(numberOfSeats);
    };


    return (
        <div className={s.SeatsTable}>
            <div className={s.SeatsTable_Header}>
                <p>You have <b>{seatsList.length}</b> seats</p>
                <div className={s.SeatsTable_Header_Config}>
                    <input
                        type="number"
                        value={numberOfSeats}
                        onChange={onNumberOfSeatChangeHandler}
                    />
                    <button onClick={onConfigureSeatsClickHandler} className={s.Btn}>Configure Seats</button>
                </div>
            </div>
            <table>
                <tbody>
                {seatsList.map((seat, i) => {
                    const index = i + 1;
                    return (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>
                                {'email' in seat
                                    ? <OccupiedSeat
                                        index={index}
                                        seat={seat}
                                        onSendEmailToSeat={onSendEmailToSeat}
                                        onSetSeatEmailClick={onSetSeatEmailClick}
                                    />
                                    : <ClearSeat
                                        index={index}
                                        onSetSeatEmailClick={onSetSeatEmailClick}
                                    />
                                }
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default SeatsTable;

type SeatsTablePropsType = {
    seatsList: Array<UsersSeatType | {}>
    onSetSeatEmailClick: (params: SetSeatParamsType) => void
    onSendEmailToSeat: (params: SendEmailToSeatParamsType) => void
    onConfigureSeatsHandler: (numberOfUsers: number) => void
}