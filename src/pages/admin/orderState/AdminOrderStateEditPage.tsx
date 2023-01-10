import { yupResolver } from "@hookform/resolvers/yup";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Messages from "@src/components/Messages";
import Row from "@src/components/Row";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, Link } from "react-router-dom";
import { storeDispatch } from "@src/redux/hooks";
import { pushMessage } from "@src/redux/reducers/messages";
import orderStateService from "@src/services/orderStateService";
import OrderStateFields from "@src/types/admin/OrderStateFields";
import orderStateValidator from "@src/validators/orderStateValidator";

export default function AdminOrderStateEditPage() {
    const { id } = useParams();

    const [isPending, setIsPending] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<OrderStateFields>({
        resolver: yupResolver(orderStateValidator)
    });

    const fetchData = useCallback(async () => {
        var response = await orderStateService.getOrderState(parseInt(id!));
        const { name, cssBadgeClass } = response.data;
        if (name) {

            setValue("name", name);
            setValue("id", parseInt(id as string))
            setValue("cssBadgeClass", cssBadgeClass);
        }
    }, [id, setValue]);


    useEffect(() => {
        fetchData();
    }, [id, fetchData, isPending])

    const onSubmit = async (data: OrderStateFields) => {
        setIsPending(true);
        if (await orderStateService.updateOrderState(data)) {
            storeDispatch(pushMessage({
                tag: "success",
                message: "Stato ordine aggiornato",
            }));
        }
        setIsPending(false);
    }

    return <>
        <BaseLayout title="Stati ordine">
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
                        <li className="breadcrumb-item active text-light" aria-current="page">Modifica stato ordine</li>
                    </ol>
                </nav>
            </Row>
            <Row>
                <Messages addClass="ps-4 pe-4 pt-4"></Messages>
            </Row>

            <Row className="p-4">
                <form className="col-lg-4" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register("id")}></input>
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
                            Aggiorna
                        </button>
                    </div>
                </form>
            </Row>
        </BaseLayout>
    </>

}
