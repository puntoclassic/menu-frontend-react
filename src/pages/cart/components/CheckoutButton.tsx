import { useState, useLayoutEffect } from "react";
import { accountStore } from "rx/account";
import { AccountState } from "types/appTypes";

export default function CheckoutButton() {

    const [accountState, setAccountState] = useState<AccountState>();

    useLayoutEffect(() => {
        accountStore.subscribe(setAccountState)
    }, [])

    if (accountState?.user) {
        return <>
            <a className="btn btn-success" href="/account/cassa/tipologia-consegna">Vai alla cassa</a>
        </>
    } else {
        return null;
    }
}