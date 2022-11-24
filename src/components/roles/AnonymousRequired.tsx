import { useState, useLayoutEffect } from 'react';
import {
    Navigate, Outlet, useSearchParams
} from 'react-router-dom';
import { accountStore } from 'rx/account';
import { AccountState } from 'types/appTypes';

export default function AnonymousRequired() {

    const [searchParams] = useSearchParams();

    const backUrl = searchParams.get("backUrl");


    const [accountState, setAccountState] = useState<AccountState>();

    useLayoutEffect(() => {
        accountStore.subscribe(setAccountState);
    }, []);

    if (accountState?.user == null) {
        return <Outlet />;
    } else {

        return <Navigate replace={true} to={backUrl ?? "/account"} />
    }

}