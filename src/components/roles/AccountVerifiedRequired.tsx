import { useState, useLayoutEffect } from 'react';
import {
    Navigate, Outlet, useLocation
} from 'react-router-dom';
import { accountStore } from 'rx/account';
import { messagesStore } from 'rx/messages';
import { AccountState } from 'types/appTypes';

export default function AccountVerifiedRequired() {

    const location = useLocation();

    const [accountState, setAccountState] = useState<AccountState>();

    useLayoutEffect(() => {
        accountStore.subscribe(setAccountState);
    }, []);

    if (accountState?.user && accountState?.user.verified) {
        return <Outlet />;
    } else {

        messagesStore.push("info", "Devi verificare il tuo account prima di poter accedere a questa pagina")

        return <Navigate to={"/account/login?backUrl=" + location.pathname} />
    }

}