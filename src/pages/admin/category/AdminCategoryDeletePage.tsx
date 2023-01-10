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
import categoryService from "@src/services/categoryService";


export default function AdminCategoryDeletePage() {

    const { id } = useParams();

    const [category, setCategory]: any = useState({
        name: ""
    });

    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    const fetchData = useCallback(async () => {
        var response = await categoryService.getCategory(parseInt(id!));
        const { name } = response.data;
        if (name) {
            setCategory({
                "name": name,
            })
        }
    }, [id]);


    useEffect(() => {
        fetchData();
    }, [id, fetchData])

    const doDelete = async () => {

        setIsPending(true);

        if (await categoryService.deleteCategory(parseInt(id!))) {
            storeDispatch(pushMessage({
                tag: "success",
                message: "Categoria eliminata",
            }));
        }
        setIsPending(false);

        navigate("/amministrazione/categorie");
    }

    return <>
        <BaseLayout title="Elimina categoria">
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
                            <Link className="text-light" to="/amministrazione/categorie">Categorie</Link>
                        </li>
                        <li className="breadcrumb-item active text-light" aria-current="page">Elimina categoria</li>
                    </ol>
                </nav>
            </Row>
            <Row className="p-4">
                <div className="col-lg-4">
                    <div className="row g-0">
                        <p>Stai per eliminare la categoria {category.name}. Sei sicuro di volerlo fare?</p>
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
