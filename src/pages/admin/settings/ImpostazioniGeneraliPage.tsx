import { yupResolver } from "@hookform/resolvers/yup";
import AccountManage from "components/AccountManage";
import CartButton from "components/CartButton";
import Header from "components/Header";
import HomeButton from "components/HomeButton";
import Messages from "components/Messages";
import Row from "components/Row";
import Topbar from "components/Topbar";
import TopbarLeft from "components/TopbarLeft";
import TopbarRight from "components/TopbarRight";
import BaseLayout from "layouts/BaseLayout";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { appStore } from "rx/app";
import { messagesStore } from "rx/messages";

import configService from "services/configService";
import orderStateService from "services/orderStateService";
import OrderStateFields from "types/admin/OrderStateFields";
import SettingFields from "types/admin/SettingFields";
import settingValidator from "validators/settingValidator";

export default function ImpostazioniGeneraliPage() {

    const [isPending, setIsPending] = useState(false);

    const [orderStates, setOrderStates] = useState<OrderStateFields[]>([])

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<SettingFields>({
        resolver: yupResolver(settingValidator),
        defaultValues: {
            theme_primary_color: "#730202",
            theme_secondary_color: "#212529"
        }
    });



    const fetchData = useCallback(async () => {
        var response = await configService.getSettings();
        const settings = response.data;
        if (settings) {

            settings.forEach((element: any) => {
                setValue(element.name, element.value);
            });



        }
    }, [setValue]);


    const fetchOrderStates = useCallback(async () => {
        var response = await orderStateService.getOrderStateForSelect();
        const orderStates = response.data;
        if (orderStates) {
            setOrderStates(orderStates);
            setValue("order_created_state_id", orderStates[0].id)
            setValue("order_paid_state_id", orderStates[0].id)
        }
    }, [setValue]);


    useEffect(() => {

        fetchOrderStates().then(() => {
            fetchData();
        });
    }, [fetchData, isPending, fetchOrderStates])

    const onSubmit = async (data: SettingFields) => {

        setIsPending(true);

        if (await configService.updateSettings(data)) {


            messagesStore.push("success", "Impostazioni aggiornate")

            appStore.reloadSettings();
        }

        setIsPending(false);

    }

    return <>
        <BaseLayout title="Impostazioni generali">
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
                        <li className="breadcrumb-item text-light">
                            <Link to="/account" className="text-light text-decoration-none">Profilo</Link>
                        </li>
                        <li className="breadcrumb-item active text-light" aria-current="page">Impostazioni generali</li>
                    </ol>
                </nav>
            </Row>
            <Messages addClass="ps-4 pt-4 pe-4"></Messages>
            <Row className="p-4">
                <form className="col-lg-4" onSubmit={handleSubmit(onSubmit)}>
                    <h6>Informazioni del sito</h6>
                    <div className="form-group pt-2">
                        <label className="form-label">Nome del sito</label>
                        <input type="text"
                            {...register("site_name")}
                            className={errors.site_name ? "form-control is-invalid" : "form-control"} />
                        <div className="invalid-feedback">
                            {errors.site_name?.message}
                        </div>
                    </div>
                    <div className="form-group pt-2">
                        <label className="form-label">Motto del sito</label>
                        <input type="text"
                            {...register("site_subtitle")}
                            className={errors.site_subtitle ? "form-control is-invalid" : "form-control"} />
                        <div className="invalid-feedback">
                            {errors.site_subtitle?.message}
                        </div>
                    </div>
                    <div className="form-group pt-4">
                        <h6>Impostazioni ordini</h6>
                    </div>
                    <div className="form-group pt-2">
                        <label className="form-label">Spese di consegna</label>
                        <input type="text"
                            {...register("shipping_costs")}
                            className={errors.shipping_costs ? "form-control is-invalid" : "form-control"} />
                        <div className="invalid-feedback">
                            {errors.shipping_costs?.message}
                        </div>
                    </div>
                    <div className="form-group pt-2">
                        <label className="form-label">Stato quando l'ordine viene creato</label>
                        <select {...register("order_created_state_id")}
                            className={errors.order_created_state_id ? "form-control is-invalid" : "form-control"}>
                            {orderStates.map((state: { id: number, name: string }) => <option value={state.id} key={state.id}>{state.name}</option>)}

                        </select>
                        <div className="invalid-feedback">
                            {errors.order_created_state_id?.message}
                        </div>
                    </div>
                    <div className="form-group pt-2">
                        <label className="form-label">Stato quando l'ordine viene pagato</label>
                        <select {...register("order_paid_state_id")}
                            className={errors.order_paid_state_id ? "form-control is-invalid" : "form-control"}>
                            {orderStates.map((state: { id: number, name: string }) => <option value={state.id} key={state.id}>{state.name}</option>)}
                        </select>
                        <div className="invalid-feedback">
                            {errors.order_paid_state_id?.message}
                        </div>
                    </div>
                    <div className="form-group pt-4">
                        <h6>Tema</h6>
                    </div>
                    <div className="form-group pt-2">
                        <label className="form-label">Colore primario</label>
                        <input type="color"
                            {...register("theme_primary_color")}
                            className={"form-control form-control-color " + (errors.theme_primary_color ? "is-invalid" : "")} />
                        <div className="invalid-feedback">
                            {errors.theme_primary_color?.message}
                        </div>
                    </div>
                    <div className="form-group pt-2">
                        <label className="form-label">Colore secondario</label>
                        <input type="color"
                            {...register("theme_secondary_color")}
                            className={"form-control form-control-color " + (errors.theme_secondary_color ? "is-invalid" : "")} />
                        <div className="invalid-feedback">
                            {errors.theme_secondary_color?.message}
                        </div>
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
