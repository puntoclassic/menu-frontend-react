import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Row from "@src/components/Row";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { storeDispatch } from "@src/redux/hooks";
import { pushMessage } from "@src/redux/reducers/messages";
import orderStateService from "@src/services/orderStateService";

export default function AdminOrderStateDeletePage() {
    const { id } = useParams();

    const [orderState, setOrderState]: any = useState({
        name: ""
    });

    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    const fetchData = useCallback(async () => {
        var response = await orderStateService.getOrderState(parseInt(id!));
        const { name } = response.data;
        if (name) {

            setOrderState({
                "name": name,
            })

        }
    }, [id]);


    useEffect(() => {
        fetchData();
    }, [id, fetchData])

    const doDelete = async () => {
        setIsPending(true);
        if (await orderStateService.deleteOrderState(parseInt(id!))) {
            storeDispatch(pushMessage({
                tag: "success",
                message: "Stato ordine eliminato",
            }));
        }
        setIsPending(false);
        navigate("/amministrazione/impostazioni/statiOrdine");
    }
    return <>
        <BaseLayout title="Elimina stato ordine">
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
                            <Link className="text-light" to="/account">Profilo</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link className="text-light" to="/amministrazione/impostazioni/statiOrdine">Stati ordine</Link>
                        </li>
                        <li className="breadcrumb-item active text-light" aria-current="page">Elimina stato</li>
                    </ol>
                </nav>
            </Row>
            <Row className="p-4">
                <div className="col-lg-4">
                    <div className="row g-0">
                        <p>Stai per eliminare lo stato "{orderState.name}". Sei sicuro di volerlo fare?</p>
                    </div>
                    <div className="row g-0">
                        <div className="col-lg-2">
                            <button type="button" className="btn btn-success me-2" onClick={() => doDelete()}>
                                {isPending ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                                Elimina
                            </button>
                        </div>
                    </div>
                </div>
            </Row>
        </BaseLayout>
    </>

}
