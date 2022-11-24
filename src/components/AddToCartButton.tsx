import { cartStore } from "rx/cart";

export default function AddToCartButton({ item }: any) {

    const addToCartAction = () => {
        cartStore.addToCart({
            id: item.id,
            name: item.name,
            price: item.price
        })
    }

    return <>
        <button type="submit" className="btn btn-info ms-3" onClick={addToCartAction}>
            <i className="bi bi-cart-plus"></i>
        </button>
    </>
}