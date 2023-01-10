import { storeDispatch } from "@src/redux/hooks";
import { addToCart } from "@src/redux/thunks/cart";


export default function AddToCartButton({ item }: any) {

    const addToCartAction = () => {
        storeDispatch(addToCart({
            id: item.id,
            name: item.name,
            price: item.price
        }))
    }

    return <>
        <button type="submit" className="btn btn-info ms-3" onClick={addToCartAction}>
            <i className="bi bi-cart-plus"></i>
        </button>
    </>
}
