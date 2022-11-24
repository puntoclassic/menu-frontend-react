import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import AccountManage from "components/AccountManage";
import CartButton from "components/CartButton";
import Header from "components/Header";
import HomeButton from "components/HomeButton";
import Row from "components/Row";
import Topbar from "components/Topbar";
import TopbarLeft from "components/TopbarLeft";
import TopbarRight from "components/TopbarRight";
import BaseLayout from "layouts/BaseLayout";
import { storeDispatch, useAppSelector } from "redux/hooks";
import { activateAccountByToken } from "redux/thunks/account";
import { AccountState, AccountVerifyStatus } from "types/appTypes";


export default function VerificaAccountTokenPage() {

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const accountState: AccountState = useAppSelector((state) => state.account);
    const { verifyAccountStatus } = accountState;

    useEffect(() => {
        if (token) {
            storeDispatch(activateAccountByToken(token));
        } else {
            navigate("/");
        }
    }, [token, navigate])

    useEffect(() => {
        if (verifyAccountStatus === AccountVerifyStatus.success || verifyAccountStatus === AccountVerifyStatus.failed) {
            navigate("/account/login")
        }
    }, [verifyAccountStatus, navigate])

    return <>
        <BaseLayout title="Verifica account">
            <Row>
                <Topbar>
                    <TopbarLeft>
                        <HomeButton></HomeButton>
                    </TopbarLeft>
                    <TopbarRight>
                        <CartButton></CartButton>
                        <AccountManage></AccountManage>
                    </TopbarRight>
                </Topbar>
            </Row>
            <Row>
                <Header></Header>
            </Row>
            <Row className="bg-secondary p-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                            <a className="text-light" href="/">Home</a>
                        </li>
                        <li className="breadcrumb-item active text-light" aria-current="page">Verifica account</li>
                    </ol>
                </nav>
            </Row>
            <Row className="flex-grow-1 justify-content-center align-items-center">

            </Row>
        </BaseLayout>
    </>
}
