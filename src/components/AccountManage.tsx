import { Link } from "react-router-dom";
import { useAppSelector } from "@src/redux/hooks";
import { AccountState } from "@src/redux/types/reduxTypes";

export default function AccountManage() {
    const accountState: AccountState = useAppSelector((state) => state.account);
    const { user } = accountState;

    if (user) {
        return <>
            <Link className="btn btn-link text-light text-decoration-none"
                to="/account"><i className="bi bi-globe2 pe-2"></i>Profilo</Link>
            <Link className="btn btn-link text-light text-decoration-none"
                to="/account/logout"><i className="bi-box-arrow-right pe-2"></i>Esci</Link>
        </>
    } else {
        return <>
            <Link to="/account/login" className="btn btn-link text-light text-decoration-none"
            ><i className="bi bi-person pe-2"></i>Accedi</Link>
        </>
    }


}
