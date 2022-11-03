import { useAppSelector } from "redux/hooks";


export default function CheckoutButton() {
    const appState = useAppSelector((state) => state.account);

    var { user } = appState;
    if (user) {
        return <>
            <a className="btn btn-success" href="/account/cassa/tipologia-consegna">Vai alla cassa</a>
        </>
    } else {
        return null;
    }
}