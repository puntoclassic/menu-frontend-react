import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { accountStore } from "rx/account";
import { AccountState } from "types/appTypes";

export default function AccountManage() {


    const [accountState, setAccountState] = useState<AccountState>();

    useLayoutEffect(() => {
        accountStore.subscribe(setAccountState);
    }, []);

    if (accountState?.user) {
        return <>
            <Link className="btn btn-link text-light text-decoration-none"
                to="/account"><i className="bi bi-globe2 pe-2"></i>Profilo</Link>
            <Link className="btn btn-link text-light text-decoration-none"
                to="/account/logout"><i className="bi-box-arrow-right pe-2"></i>Esci</Link>
        </>
    } else {
        return <>
            <Link to="/account/login" className="btn btn-link text-light text-decoration-none"
            ><i className="bi bi-person pe-2"></i>Accedi</Link>
        </>
    }


}