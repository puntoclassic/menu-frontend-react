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

import { accountStore } from "rx/account";
import { messagesStore } from "rx/messages";


export default function VerificaAccountTokenPage() {

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();


    useEffect(() => {
        if (token) {
            accountStore.activateAccountByToken(token).subscribe({
                next: () => {
                    messagesStore.push(
                        "success",
                        "Il tuo account è stato attivato, ora puoi procedere con il login",
                    );
                    navigate("/account/login")
                },
                error: () => {
                    messagesStore.push(
                        "error",
                        "Impossibile verificare il tuo account, token non valido",
                    );
                    navigate("/account/login")
                }
            })
        } else {
            navigate("/");
        }
    }, [token, navigate])

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
