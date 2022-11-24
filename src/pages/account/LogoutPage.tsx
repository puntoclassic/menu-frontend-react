import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountManage from "components/AccountManage";
import CartButton from "components/CartButton";
import CategoryPills from "components/CategoryPills";
import Header from "components/Header";
import Row from "components/Row";
import SearchForm from "components/SearchForm";
import Topbar from "components/Topbar";
import TopbarLeft from "components/TopbarLeft";
import TopbarRight from "components/TopbarRight";
import BaseLayout from "layouts/BaseLayout";
import { AccountState } from "types/appTypes";
import { messagesStore } from "rx/messages";
import { accountStore } from "rx/account";


export default function Logout() {


    const navigate = useNavigate();

    const [accountState, setAccountState] = useState<AccountState>();

    useLayoutEffect(() => {
        accountStore.subscribe(setAccountState);
    }, []);

    useEffect(() => {
        if (accountState?.user) {
            accountStore.logout().subscribe({
                complete() {
                    messagesStore.push("success", "Sei stato disconnesso con successo")

                    navigate("/account/login");
                },
            });
        } else {
            navigate("/account/login");
        }
    }, [accountState?.user, navigate]);

    return <>
        <BaseLayout title="Logout">
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
            <Row>
                <CategoryPills></CategoryPills>
            </Row>
            <Row></Row>
        </BaseLayout>
    </>
}
