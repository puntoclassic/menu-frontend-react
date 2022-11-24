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
import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { cartStore } from "rx/cart";
import { CartState } from "types/appTypes";

import tipologiaConsegnaValidator from "validators/tipologiaConsegnaValidator";


export default function TipologiaConsegnaPage() {

    type TipologiaConsegnaFields = {
        tipologia_consegna: string
    }

    const [cartState, setCartState] = useState<CartState>();

    useLayoutEffect(() => {
        cartStore.subscribe(setCartState);
    }, [])

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<TipologiaConsegnaFields>({
        resolver: yupResolver(tipologiaConsegnaValidator),
    });

    useEffect(() => {
        setValue("tipologia_consegna", cartState?.tipologia_consegna ?? "asporto");
    }, [cartState, setValue])

    const navigate = useNavigate();

    const onSubmit = (data: TipologiaConsegnaFields) => {
        cartStore.updateTipologiaConsegna(data.tipologia_consegna);
        if (data.tipologia_consegna === "asporto") {
            navigate("/account/cassa/riepilogo-ordine");
        } else {
            navigate("/account/cassa/informazioni-consegna");
        }
    }

    return <>
        <BaseLayout title="Tipologia di consegna">
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
                            <Link to="/carrello" className="text-light">Carrello</Link>
                        </li>
                        <li className="breadcrumb-item active text-light" aria-current="page">1. Tipologia di consegna</li>
                    </ol>
                </nav>
            </Row>
            <Row className="pt-4 ps-4 pe-4">
                <div className="col-lg-12">
                    <div className="row g-0 border-top border-bottom p-4 d-flex justify-content-center flex-column">
                        <form className="col-lg-4 m-0" onSubmit={handleSubmit(onSubmit)}>
                            <h5 className="m-0">1. Spedizione e consegna</h5>
                            <p>Scegli il modo in cui vuoi ricevere il tuo ordine</p>
                            <div className="form-row mb-3">
                                <select {...register("tipologia_consegna")}
                                    className={errors.tipologia_consegna ? "form-control is-invalid" : "form-control"}>
                                    <option value="asporto">Asporto</option>
                                    <option value="domicilio">A domicilio</option>
                                </select>
                                <div className="invalid-feedback">
                                    {errors.tipologia_consegna?.message}
                                </div>
                            </div>
                            <div className="form-row">
                                <button type="submit" className="btn btn-success">Vai</button>
                            </div>
                        </form>
                    </div>
                    <div className="row g-0 border-bottom p-4 d-flex justify-content-center flex-column mt-2">
                        <h5 className="m-0">2. Indirizzo e orario</h5>
                    </div>
                    <div className="row g-0 border-bottom p-4 d-flex justify-content-center flex-column mt-2">
                        <h5 className="m-0">3. Riepilogo</h5>
                    </div>
                </div>
            </Row>
        </BaseLayout>
    </>
}