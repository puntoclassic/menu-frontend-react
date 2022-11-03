import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import AccountManage from "components/AccountManage";
import CartButton from "components/CartButton";
import Header from "components/Header";
import Messages from "components/Messages";
import Row from "components/Row";
import SearchForm from "components/SearchForm";
import Topbar from "components/Topbar";
import TopbarLeft from "components/TopbarLeft";
import TopbarRight from "components/TopbarRight";
import BaseLayout from "layouts/BaseLayout";
import { storeDispatch, useAppSelector } from "redux/hooks";
import PersonalInfoFields from "types/PersonalInfoFields";
import personalInfoValidator from "validators/personalInfoValidator";
import { useForm } from "react-hook-form";
import { updatePersonalInfo } from "redux/thunks/account";


export default function LoginPage() {

    const accountState = useAppSelector((state) => state.account);

    const { user, pendingRequest } = accountState;


    const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfoFields>({
        resolver: yupResolver(personalInfoValidator),
        defaultValues: {
            firstname: user.firstname,
            lastname: user.lastname
        }
    });


    const onSubmit = (data: PersonalInfoFields) => {
        storeDispatch(updatePersonalInfo(data));
    }


    return <>
        <BaseLayout title="Informazioni personali">
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
            <Row className="bg-secondary p-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                            <Link to="/account" className="text-light">Profilo</Link>
                        </li>
                        <li className="breadcrumb-item active text-light" aria-current="page">Informazioni personali</li>
                    </ol>
                </nav>
            </Row>
            <Messages addClass="ps-4 pt-4 pe-4" ></Messages>
            <Row className="pt-4 ps-4 pe-4">
                <div className="col-lg-12">
                    <div className="row g-0">
                        <form className="col-lg-4" onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-group pt-2">
                                <label className="form-label">Nome</label>
                                <input type="text"
                                    {...register("firstname")}
                                    className={errors.firstname ? "form-control is-invalid" : "form-control"} />
                                <div className="invalid-feedback">
                                    {errors.firstname?.message}
                                </div>
                            </div>
                            <div className="form-group pt-2">
                                <label className="form-label">Cognome</label>
                                <input type="text"
                                    {...register("lastname")}
                                    className={errors.lastname ? "form-control is-invalid" : "form-control"} />
                                <div className="invalid-feedback">
                                    {errors.lastname?.message}
                                </div>
                            </div>

                            <div className="form-group pt-4">
                                <button type="submit" className="btn btn-primary me-2">
                                    {pendingRequest ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                                    Aggiorna informazioni</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Row>
        </BaseLayout>
    </>
}
