import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom"
import { cartStore } from "rx/cart";
import { CartState } from "types/appTypes"

export default function CartButton() {

    const [cartState, setCartState] = useState<CartState>();

    useLayoutEffect(() => {
        cartStore.subscribe(setCartState);
    }, [])

    return <>
        <Link className="btn btn-link text-light text-decoration-none" to="/carrello"
        ><i className="bi bi-bag pe-2"></i>Carrello<span className="badge d-none d-md-none d-xxl-inline-block rounded-pill bg-danger">
                {cartState ? Object.keys(cartState?.items).length : 0}<span className="visually-hidden">elementi nel carrello</span>
            </span></Link>
    </>
}