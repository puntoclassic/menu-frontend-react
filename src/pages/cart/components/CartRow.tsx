import { increaseQty, decreaseQty, removeFromCart } from "redux/thunks/cart"
import { storeDispatch } from "redux/hooks";


export default function CartRow({ row, actionsVisible }: any) {
    var item = row.item;

    const increaseQtaAction = (row: any) => {
        storeDispatch(increaseQty({
            id: item.id,
        }))
    }

    const decreaseQtaAction = (row: any) => {
        storeDispatch(decreaseQty({
            id: item.id,
        }))
    }

    const removeFromCartAction = (row: any) => {
        storeDispatch(removeFromCart({
            id: item.id,
        }))
    }

    const actions = () => {
        return <td className="text-center">
            <div className="d-flex flex-row justify-content-center">
                <button type="submit" className="btn btn-link m-0" onClick={(e) => increaseQtaAction(item)}>
                    <i className="bi bi-bag-plus"></i>
                </button>
                <button type="submit" className="btn btn-link m-0" onClick={(e) => decreaseQtaAction(item)}>
                    <i className="bi bi-bag-dash"></i>
                </button>
                <button type="submit" className="btn btn-link m-0" onClick={(e) => removeFromCartAction(item)}>
                    <i className="bi bi-bag-x"></i>
                </button>
            </div>
        </td>
    }

    return <tr>
        <td className="col-lg-6">{item.name}</td>
        <td className="text-center">{row.quantity}</td>
        <td className="text-center">{parseFloat(item.price).toFixed(2)} €</td>
        {actionsVisible ? actions() : null}
    </tr>

}