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
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { storeDispatch, useAppSelector } from "redux/hooks";
import { pushIndirizzo, pushOrario } from "redux/reducers/cart";
import informazioniConsegnaValidator from "validators/informazioniConsegnaValidator";


export default function InformazioniConsegnaPage() {

    type InformazioniConsegnaFields = {
        orario: string;
        indirizzo: string;
    }

    const { orario, indirizzo } = useAppSelector((state) => state.cart);
    const { register, handleSubmit, formState: { errors } } = useForm<InformazioniConsegnaFields>({
        resolver: yupResolver(informazioniConsegnaValidator),
        defaultValues: {
            orario: orario,
            indirizzo: indirizzo
        }
    });

    const navigate = useNavigate();

    const onSubmit = (data: InformazioniConsegnaFields) => {
        storeDispatch(pushIndirizzo(data.indirizzo));
        storeDispatch(pushOrario(data.orario));
        navigate("/account/cassa/riepilogo-ordine");
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
                        <li className="breadcrumb-item">
                            <Link to="/account/cassa/tipologia-consegna" className="text-light">1</Link>
                        </li>
                        <li className="breadcrumb-item active text-light" aria-current="page">2. Informazioni consegna</li>
                    </ol>
                </nav>
            </Row>
            <Row className="pt-4 ps-4 pe-4">
                <div className="col-lg-12">
                    <div className="row g-0 border-top border-bottom p-4 d-flex justify-content-center flex-column">
                        <Link to="/account/cassa/tipologia-consegna" className="text-dark text-decoration-none"><h5 className="m-0">1. Spedizione e consegna</h5></Link>

                    </div>
                    <div className="row g-0 border-bottom p-4 d-flex justify-content-center flex-column mt-2">
                        <h5 className="m-0">2. Indirizzo e orario</h5>
                        <form className="col-lg-4 m-0" onSubmit={handleSubmit(onSubmit)}>
                            <p>Inserisci le informazioni di consegna</p>
                            <div className="form-group pt-2">
                                <label className="form-label">Indirizzo</label>
                                <input type="text"
                                    {...register("indirizzo")}
                                    className={errors.indirizzo ? "form-control is-invalid" : "form-control"} />
                                <div className="invalid-feedback">
                                    {errors.indirizzo?.message}
                                </div>
                            </div>
                            <div className="form-group pt-2">
                                <label className="form-label">Orario</label>
                                <input type="text"
                                    {...register("orario")}
                                    className={errors.orario ? "form-control is-invalid" : "form-control"} />
                                <div className="invalid-feedback">
                                    {errors.orario?.message}
                                </div>
                            </div>
                            <div className="form-row pt-4">
                                <button type="submit" className="btn btn-success">Vai</button>
                            </div>
                        </form>
                    </div>
                    <div className="row g-0 border-bottom p-4 d-flex justify-content-center flex-column mt-2">
                        <h5 className="m-0">3. Riepilogo</h5>
                    </div>
                </div>
            </Row>
        </BaseLayout>
    </>
}