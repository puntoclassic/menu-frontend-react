import { useState, useLayoutEffect } from 'react';
import {
    Navigate, Outlet, useLocation, createSearchParams
} from 'react-router-dom';
import { accountStore } from 'rx/account';
import { messagesStore } from 'rx/messages';
import { AccountState } from 'types/appTypes';

export default function AdminRequiredRoute() {


    const location = useLocation();

    const [accountState, setAccountState] = useState<AccountState>();

    useLayoutEffect(() => {
        accountStore.subscribe(setAccountState);
    }, []);


    if (accountState?.user && accountState?.user.role === "admin") {
        return <Outlet />;
    } else {
        if (!accountState?.user) {

            messagesStore.push("info", "Questa pagina richiede l'accesso")

            var fromParams = new URLSearchParams(location.search);

            var params = createSearchParams({ backUrl: `${location.pathname}?${createSearchParams(fromParams)}` })

            var toObj = {
                pathname: "/account/login",
                search: `?${createSearchParams(params)}`
            }

            return <Navigate replace={true} to={toObj} />
        } else {
            return <Navigate to={"/403"} />
        }
    }

}