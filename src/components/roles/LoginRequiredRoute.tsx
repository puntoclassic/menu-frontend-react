import Loading from 'pages/Loading';
import { useState, useLayoutEffect } from 'react';
import {
    Navigate, Outlet, useLocation
} from 'react-router-dom';
import { accountStore } from 'rx/account';
import { messagesStore } from 'rx/messages';
import { AccountState } from 'types/appTypes';

export default function LoginRequiredRoute() {

    const location = useLocation();

    const [accountState, setAccountState] = useState<AccountState>();

    useLayoutEffect(() => {
        accountStore.subscribe(setAccountState);
    }, []);

    if (accountState?.userLogged) {
        return <Outlet />;
    } else if (accountState?.userLogged == null) {
        return <Loading></Loading>
    } else {

        messagesStore.push("info", "Questa pagina richiede l'accesso")

        return <Navigate replace={true} to={"/account/login?backUrl=" + location.pathname} />

    }

}