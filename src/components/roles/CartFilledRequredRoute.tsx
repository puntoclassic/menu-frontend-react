import { useState, useLayoutEffect } from 'react';
import {
    Navigate, Outlet
} from 'react-router-dom';
import { cartStore } from 'rx/cart';
import { CartState } from 'types/appTypes';

export default function CartFilledRequiredRoute() {

    const [cartState, setCartState] = useState<CartState>();

    useLayoutEffect(() => {
        cartStore.subscribe(setCartState);
    }, [])


    if (Object.keys(cartState?.items).length > 0) {
        return <Outlet />;
    } else {
        return <Navigate replace={true} to={"/carrello"} />

    }

}