import {
    Navigate, Outlet, useLocation, createSearchParams
} from 'react-router-dom';
import { useAppSelector } from "redux/hooks";
import { messagesStore } from 'rx/messages';

export default function AdminRequiredRoute() {

    const { user } = useAppSelector((state) => state.account);
    const location = useLocation();


    if (user && user.role === "admin") {
        return <Outlet />;
    } else {
        if (!user) {

            messagesStore.push("info", "Questa pagina richiede l'accesso")

            var fromParams = new URLSearchParams(location.search);

            var params = createSearchParams({ backUrl: `${location.pathname}?${createSearchParams(fromParams)}` })

            var toObj = {
                pathname: "/account/login",
                search: `?${createSearchParams(params)}`
            }

            return <Navigate replace={true} to={toObj} />
        } else {
            return <Navigate to={"/403"} />
        }
    }

}