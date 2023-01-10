import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import CategoryPills from "@src/components/CategoryPills";
import Header from "@src/components/Header";
import Row from "@src/components/Row";
import SearchForm from "@src/components/SearchForm";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { storeDispatch, useAppSelector } from "@src/redux/hooks";
import { pushMessage } from "@src/redux/reducers/messages";
import { logout } from "@src/redux/thunks/account";
import { AccountState } from "@src/redux/types/reduxTypes";


export default function Logout() {

    const accountState: AccountState = useAppSelector((state) => state.account);
    const { user } = accountState;
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            storeDispatch(logout())
        } else {
            storeDispatch(pushMessage({
                "tag": "success",
                "message": "Sei stato disconnesso con successo"
            }))
            navigate("/account/login");
        }
    }, [user, navigate]);

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
