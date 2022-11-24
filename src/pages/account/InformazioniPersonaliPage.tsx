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
import PersonalInfoFields from "types/PersonalInfoFields";
import personalInfoValidator from "validators/personalInfoValidator";
import { useForm } from "react-hook-form";
import { accountStore } from "rx/account";
import { messagesStore } from "rx/messages";
import { useState, useLayoutEffect, useEffect } from "react";
import { AccountState } from "types/appTypes";


export default function LoginPage() {

    const [isPending, setIsPending] = useState(false);
    const [accountState, setAccountState] = useState<AccountState>();

    useLayoutEffect(() => {
        accountStore.subscribe(setAccountState);
    }, []);




    const { register, handleSubmit, formState: { errors }, setValue } = useForm<PersonalInfoFields>({
        resolver: yupResolver(personalInfoValidator),

    });

    useEffect(() => {
        setValue("firstname", accountState?.user.firstname);
        setValue("lastname", accountState?.user.lastname);
    }, [accountState, setValue]);

    const onSubmit = (data: PersonalInfoFields) => {
        setIsPending(true);
        accountStore.updatePersonalInfo(data).subscribe({
            next: () => {
                messagesStore.push(
                    "success",
                    "Informazioni aggiornate con successo",
                );
                accountStore.loadAccountState();
                setIsPending(false);

            },
            error: () => {
                messagesStore.push(
                    "error",
                    "Si è verificato un errore nel gestire la richiesta",
                );
                setIsPending(false);
            }
        })
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
                                    {isPending ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                                    Aggiorna informazioni</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Row>
        </BaseLayout>
    </>
}
