import { useEffect } from "react";
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
import { storeDispatch, useAppSelector } from "redux/hooks";
import { pushMessage } from "redux/reducers/messages";
import { logout } from "redux/thunks/account";
import { AccountState } from "redux/types/reduxTypes";


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
