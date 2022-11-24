import AccountManage from "components/AccountManage";
import CartButton from "components/CartButton";
import Header from "components/Header";
import HomeButton from "components/HomeButton";
import Row from "components/Row";
import Topbar from "components/Topbar";
import TopbarLeft from "components/TopbarLeft";
import TopbarRight from "components/TopbarRight";
import BaseLayout from "layouts/BaseLayout";
import CartRow from "pages/cart/components/CartRow";
import { useState, useLayoutEffect, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { appStore } from "rx/app";
import { cartStore } from "rx/cart";
import { AppState, CartState } from "types/appTypes";

export default function RiepilogoOrdinePage() {


    const [cartState, setCartState] = useState<CartState>();

    useLayoutEffect(() => {
        cartStore.subscribe(setCartState);
    }, [])

    const [appState, setAppState] = useState<AppState>();

    useLayoutEffect(() => {
        appStore.subscribe(setAppState)
    }, [])

    var shipping_row = {
        item: {
            id: 0,
            name: "Spese di consegna",
            price: 0
        },
        quantity: 1
    }

    type RiepilogoOrdineFields = {
        note: string
    }

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<RiepilogoOrdineFields>({

    });

    useEffect(() => {
        shipping_row.item.price = appState?.settings.shipping_costs;
        setValue("note", cartState?.note ?? "");

    }, [appState, cartState?.note, setValue, shipping_row.item])


    const informazioniConsegna = () => {
        if (cartState?.tipologia_consegna !== "asporto") {
            return <>
                <div className="row g-0">
                    <h6>Dettagli</h6>
                    <p>
                        Orario: {cartState?.orario} <br />
                        Indirizzo di consegna: {cartState?.indirizzo}
                    </p>
                </div>
            </>
        } else {
            return <></>
        }
    }

    const onSubmit = (data: RiepilogoOrdineFields) => {
        cartStore.updateNote(data.note);
    }

    const shipping_costs_row = () => {
        if (cartState?.tipologia_consegna !== "asporto") {
            return <CartRow key={-1} row={shipping_row}></CartRow>
        }
        return null;
    }

    const subTotal = () => {
        return cartState?.tipologia_consegna !== "asporto" ? cartState!.total + parseFloat(appState?.settings.shipping_costs) : cartState!.total;
    }

    const content = () => {
        return <>
            <div className="col-lg-12 d-flex flex-grow-1 flex-column">
                <div className="col-lg-12">
                    <div className="row g-0">
                        <h5 className="m-0 mb-4">{cartState?.tipologia_consegna === "asporto" ? "2" : "3"}. Riepilogo</h5>
                        <h6>Informazioni di consegna</h6>
                        <div className="col-lg-6">
                            <div className="row g-0">
                                {cartState?.tipologia_consegna === "asporto" ? <p>Hai scelto di ritirare il tuo ordine (asporto)</p> : <p>Hai scelto la consegna a domicilio</p>}
                            </div>
                            {informazioniConsegna()}
                        </div>
                    </div>
                    <div className="row g-0">
                        <div className="col-lg-12">
                            <h6>Cosa c'è nel tuo ordine</h6>
                            <div className="table-responsive">
                                <table className="table table-striped align-middle">
                                    <thead>
                                        <tr>
                                            <th className="col-6">Cibo</th>
                                            <th className="col-2 text-center">Quantità</th>
                                            <th className="col-2 text-center">Prezzo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.values(cartState?.items).map((row: any) => <CartRow actionsVisible={false} row={row} key={row.item.id}></CartRow>)}
                                        {shipping_costs_row()}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="col-6"></td>
                                            <td className="fw-bold text-center">Totale</td>
                                            <td className="text-center">{subTotal().toFixed(2)} €</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0">
                        <form className="col-lg-4 m-0" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group pt-2">
                                <label className="form-label">Note</label>
                                <textarea {...register("note")}
                                    className={errors.note ? "form-control is-invalid" : "form-control"}></textarea>

                                <div className="invalid-feedback">
                                    {errors.note?.message}
                                </div>
                            </div>
                            <div className="form-group pt-4">
                                <button type="submit" className="btn btn-success">Invia ordine</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    }

    const linkInformazioniConsegna = () => {
        return <>
            <li className="breadcrumb-item">
                <Link to="/account/cassa/informazioni-consegna" className="text-light">2</Link>
            </li>
        </>
    }

    return <>
        <BaseLayout title="Carrello">
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
                        <li className="breadcrumb-item">
                            <Link to="/account/cassa/tipologia-consegna" className="text-light">1</Link>
                        </li>
                        {cartState?.tipologia_consegna === "asporto" ? null : linkInformazioniConsegna()}

                        <li className="breadcrumb-item active text-light" aria-current="page">{cartState?.tipologia_consegna === "asporto" ? "2" : "3"}. Riepilogo ordine</li>
                    </ol>
                </nav>
            </Row>
            <Row className="pt-4 ps-4 pe-4">
                <div className="col-lg-12">
                    <div className="row g-0 border-top p-4 d-flex justify-content-center flex-column">
                        <Link to="/account/cassa/tipologia-consegna" className="text-dark text-decoration-none">
                            <h5 className="m-0">1. Spedizione e consegna</h5>
                        </Link>
                    </div>
                    {cartState?.tipologia_consegna === "asporto" ? null : <>
                        <div className="row g-0 border-top p-4 d-flex justify-content-center flex-column">
                            <Link to="/account/cassa/informazioni-consegna" className="text-dark text-decoration-none">
                                <h5 className="m-0">{cartState?.tipologia_consegna !== "asporto" ? "3" : "2"}. Indirizzo e orario</h5>
                            </Link>
                        </div>
                    </>}
                    <div className="row g-0 border-top p-4 d-flex justify-content-center flex-column">
                        {content()}
                    </div>
                </div>
            </Row>
        </BaseLayout>
    </>
}