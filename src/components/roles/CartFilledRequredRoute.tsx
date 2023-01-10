import {
    Navigate, Outlet
} from 'react-router-dom';
import { useAppSelector } from "@src/redux/hooks";

export default function CartFilledRequiredRoute() {

    const { items } = useAppSelector((state) => state.cart);

    if (Object.keys(items).length > 0) {
        return <Outlet />;
    } else {
        return <Navigate replace={true} to={"/carrello"} />

    }

}
