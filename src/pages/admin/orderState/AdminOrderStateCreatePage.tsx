import { yupResolver } from "@hookform/resolvers/yup";
import AccountManage from "components/AccountManage";
import CartButton from "components/CartButton";
import Header from "components/Header";
import HomeButton from "components/HomeButton";
import Row from "components/Row";
import Topbar from "components/Topbar";
import TopbarLeft from "components/TopbarLeft";
import TopbarRight from "components/TopbarRight";
import BaseLayout from "layouts/BaseLayout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { messagesStore } from "rx/messages";
import orderStateService from "services/orderStateService";
import OrderStateFields from "types/admin/OrderStateFields";
import orderStateValidator from "validators/orderStateValidator";

export default function AdminOrderStateCreatePage() {
    const navigate = useNavigate();

    const [isPending, setIsPending] = useState(false);

    const { register, handleSubmit, formState: { errors }, } = useForm<OrderStateFields>({
        resolver: yupResolver(orderStateValidator)
    });

    const onSubmit = async (data: OrderStateFields) => {

        setIsPending(true);

        if (await orderStateService.createOrderState(data)) {

            messagesStore.push("success", "Stato ordine creato")

        }

        setIsPending(false);
        navigate("/amministrazione/impostazioni/statiOrdine");
    }

    return <>
        <BaseLayout title="Nuovo stato ordine">
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
                        <li className="breadcrumb-item active text-light" aria-current="page">Crea stato</li>
                    </ol>
                </nav>
            </Row>

            <Row className="p-4">
                <form className="col-lg-4" onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group pt-2">
                        <label className="form-label">Nome</label>
                        <input type="text"
                            {...register("name")}
                            className={errors.name ? "form-control is-invalid" : "form-control"} />
                        <div className="invalid-feedback">
                            {errors.name?.message}
                        </div>
                    </div>
                    <div className="form-group pt-2">
                        <label className="form-label">Classe CSS per il badge</label>
                        <input type="text" className="form-control"
                            {...register("cssBadgeClass")}
                        />
                    </div>


                    <div className="form-group pt-4">
                        <button type="submit" className="btn btn-success me-2">
                            {isPending ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                            Crea
                        </button>
                    </div>
                </form>
            </Row>
        </BaseLayout>
    </>
}