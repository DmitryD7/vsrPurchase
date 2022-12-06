import React from 'react';
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
    } = props;

    return (
        <div className={s.SeatsTable}>
            <div className={s.SeatsTable_Header}>
                <p>You have <b>{seatsList.length}</b> seats</p>
            </div>
            <table className={s.SeatsTable_Table}>
                <tbody>
                {seatsList.map((seat, i) => {
                    const index = i + 1;
                    return (
                        <tr key={index}>
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

// export default SeatsTable;
export const MemoizedSeatsTable = React.memo(SeatsTable);

type SeatsTablePropsType = {
    seatsList: Array<UsersSeatType | {}>
    onSetSeatEmailClick: (params: SetSeatParamsType) => void
    onSendEmailToSeat: (params: SendEmailToSeatParamsType) => void
}