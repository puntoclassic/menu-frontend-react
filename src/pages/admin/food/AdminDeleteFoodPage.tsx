import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Row from "@src/components/Row";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { storeDispatch } from "@src/redux/hooks";
import { pushMessage } from "@src/redux/reducers/messages";
import foodService from "@src/services/foodService";

export default function AdminFoodDeletePage() {

    const { id } = useParams();

    const [food, setfood]: any = useState({
        name: ""
    });

    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    const fetchData = useCallback(async () => {
        var response = await foodService.getFood(parseInt(id!));
        const { name } = response.data;
        if (name) {

            setfood({
                "name": name,
            })

        }
    }, [id]);


    useEffect(() => {
        fetchData();
    }, [id, fetchData])

    const doDelete = async () => {

        setIsPending(true);
        if (await foodService.deleteFood(parseInt(id!))) {
            storeDispatch(pushMessage({
                tag: "success",
                message: "Cibo eliminato",
            }));
        }
        navigate("/amministrazione/cibi");
        setIsPending(false);
    }
    return <>
        <BaseLayout title="Elimina cibo">
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
                            <Link className="text-light" to="/amministrazione/cibi">Cibi</Link>
                        </li>
                        <li className="breadcrumb-item active text-light" aria-current="page">Elimina cibo</li>
                    </ol>
                </nav>
            </Row>
            <Row className="p-4">
                <div className="col-lg-4">
                    <div className="row g-0">
                        <p>Stai per eliminare il cibo {food.name}. Sei sicuro di volerlo fare?</p>
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
