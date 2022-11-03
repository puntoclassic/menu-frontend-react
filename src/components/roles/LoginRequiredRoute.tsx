import Loading from 'pages/Loading';
import {
    Navigate, Outlet, useLocation
} from 'react-router-dom';
import { storeDispatch, useAppSelector } from "redux/hooks";
import { pushMessage } from "redux/reducers/messages";

export default function LoginRequiredRoute() {

    const { userLogged } = useAppSelector((state) => state.account);
    const location = useLocation();

    if (userLogged) {
        return <Outlet />;
    } else if (userLogged == null) {
        return <Loading></Loading>
    } else {
        storeDispatch(pushMessage({
            "tag": "info",
            "message": "Questa pagina richiede l'accesso"
        }))
        return <Navigate replace={true} to={"/account/login?backUrl=" + location.pathname} />

    }

}