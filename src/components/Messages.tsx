import { useEffect, useLayoutEffect, useState } from "react";
import { messagesStore } from "rx/messages";
import { MessagesState } from "types/appTypes";


export default function Messages({ addClass = null }: any) {


    const [messagesState, setMessagesState] = useState<MessagesState>({});
    const { info, success, error } = messagesState;

    useLayoutEffect(() => {
        messagesStore.subscribe(setMessagesState);
    }, [])


    useEffect(() => {
        return () => {
            messagesStore.reset();
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