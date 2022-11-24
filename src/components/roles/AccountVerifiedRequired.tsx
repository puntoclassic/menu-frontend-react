import {
    Navigate, Outlet, useLocation
} from 'react-router-dom';
import { useAppSelector } from "redux/hooks";
import { messagesStore } from 'rx/messages';

export default function AccountVerifiedRequired() {

    const { user } = useAppSelector((state) => state.account);
    const location = useLocation();




    if (user && user.verified) {
        return <Outlet />;
    } else {

        messagesStore.push("info", "Devi verificare il tuo account prima di poter accedere a questa pagina")

        return <Navigate to={"/account/login?backUrl=" + location.pathname} />
    }

}