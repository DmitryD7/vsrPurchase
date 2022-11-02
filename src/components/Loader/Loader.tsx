import {InfinitySpin} from "react-loader-spinner";
import s from "./Loader.module.css";

export const Loader = () => {
    return (
        <div className={s.Loader}>
            <InfinitySpin color={'black'} width={'300'}/>
        </div>
    );
}