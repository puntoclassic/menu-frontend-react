import { useEffect } from "react";
import { storeDispatch, useAppSelector } from "redux/hooks";
import { resetMessages } from "redux/reducers/messages";


export default function Messages({ addClass = null }: any) {

    const messagesState = useAppSelector((state) => state.messages);
    const { info, success, error } = messagesState;

    useEffect(() => {
        return () => {
            storeDispatch(resetMessages());
        }
    }, [])

    const showInfo = () => {
        return <>
            <div className={addClass ? "row g-0 " + addClass : "row g-0"}>
                <div className="alert alert-info m-0">
                    <span>{info}</span>
                    <br />
                </div>
            </div>
        </>
    }

    const showSuccess = () => {
        return <>
            <div className={addClass ? "row g-0 " + addClass : "row g-0"}>
                <div className="alert alert-success m-0">
                    <span>{success}</span>
                    <br />
                </div>
            </div>
        </>
    }

    const showError = () => {
        return <>
            <div className={addClass ? "row g-0 " + addClass : "row g-0"}>
                <div className="alert alert-danger m-0">
                    <span>{error}</span>
                    <br />
                </div>
            </div>
        </>
    }



    return <>
        {info ? showInfo() : null}
        {success ? showSuccess() : null}
        {error ? showError() : null}
    </>
}