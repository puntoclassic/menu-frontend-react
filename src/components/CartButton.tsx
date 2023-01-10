import { Link } from "react-router-dom"
import { useAppSelector } from "@src/redux/hooks"
import { CartState } from "@src/redux/types/reduxTypes"

export default function CartButton() {
    const cartState: CartState = useAppSelector((state) => state.cart)

    return <>
        <Link className="btn btn-link text-light text-decoration-none" to="/carrello"
        ><i className="bi bi-bag pe-2"></i>Carrello<span className="badge d-none d-md-none d-xxl-inline-block rounded-pill bg-danger">
                {Object.keys(cartState.items).length}<span className="visually-hidden">elementi nel carrello</span>
            </span></Link>
    </>
}
