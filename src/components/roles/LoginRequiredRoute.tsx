import Loading from 'pages/Loading';
import {
    Navigate, Outlet, useLocation
} from 'react-router-dom';
import { useAppSelector } from "redux/hooks";
import { messagesStore } from 'rx/messages';

export default function LoginRequiredRoute() {

    const { userLogged } = useAppSelector((state) => state.account);
    const location = useLocation();

    if (userLogged) {
        return <Outlet />;
    } else if (userLogged == null) {
        return <Loading></Loading>
    } else {

        messagesStore.push("info", "Questa pagina richiede l'accesso")

        return <Navigate replace={true} to={"/account/login?backUrl=" + location.pathname} />

    }

}