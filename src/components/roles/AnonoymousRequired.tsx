import {
    Navigate, Outlet, useSearchParams
} from 'react-router-dom';
import { useAppSelector } from '@src/redux/hooks';


export default function AnonymousRequired() {

    const [searchParams] = useSearchParams();

    const backUrl = searchParams.get("backUrl");

    const { user } = useAppSelector((state) => state.account);


    if (user == null) {
        return <Outlet />;
    } else {

        return <Navigate replace={true} to={backUrl ?? "/account"} />
    }

}
