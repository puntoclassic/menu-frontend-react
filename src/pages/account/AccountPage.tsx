import { Link } from "react-router-dom";
import DashboardAdmin from "pages/account/components/DashboardAdmin";
import AccountManage from "components/AccountManage";
import CartButton from "components/CartButton";
import Header from "components/Header";
import Messages from "components/Messages";
import Row from "components/Row";
import SearchForm from "components/SearchForm";
import Topbar from "components/Topbar";
import TopbarLeft from "components/TopbarLeft";
import TopbarRight from "components/TopbarRight";
import BaseLayout from "layouts/BaseLayout";
import { useState, useLayoutEffect } from "react";
import { accountStore } from "rx/account";
import { AccountState } from "types/appTypes";


export default function LoginPage() {

    const [accountState, setAccountState] = useState<AccountState>();

    useLayoutEffect(() => {
        accountStore.subscribe(setAccountState);
    }, []);

    return <>
        <BaseLayout title="Profilo">
            <Row>
                <Topbar>
                    <TopbarLeft>
                        <SearchForm></SearchForm>
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
                        <li className="breadcrumb-item text-light">
                            Profilo
                        </li>
                        <li className="breadcrumb-item active text-light" aria-current="page">{accountState?.user.firstname} {accountState?.user.lastname}</li>
                    </ol>
                </nav>
            </Row>
            <Messages addClass="ps-4 pt-4 pe-4"></Messages>
            <Row className="pt-4">
                <div className="col-lg-12 ps-4 pe-4">
                    <div className="row g-0">
                        <div className="col-lg-4">
                            <ul style={{ listStyleType: 'none' }} className="p-0">
                                <li>
                                    <h4>Il mio profilo</h4>
                                </li>
                                <li>
                                    <Link to="/account/informazioni-personali" className="text-decoration-none"><i
                                        className="bi bi-person-lines-fill me-2"></i>
                                        Informazioni personali</Link>
                                </li>
                                <li>
                                    <Link className="text-decoration-none" to="/account/cambia-password"><i className="bi bi-key me-2"></i>
                                        Cambia la password</Link>
                                </li>
                                <li>
                                    <a className="text-decoration-none" href="/account/ordini"><i className="bi bi-bag me-2"></i>
                                        I miei ordini</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <DashboardAdmin></DashboardAdmin>
                </div>
            </Row>
        </BaseLayout>
    </>
}
