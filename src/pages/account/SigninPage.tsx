import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountManage from "components/AccountManage";
import CartButton from "components/CartButton";
import Header from "components/Header";
import HomeButton from "components/HomeButton";
import Row from "components/Row";
import Topbar from "components/Topbar";
import TopbarLeft from "components/TopbarLeft";
import TopbarRight from "components/TopbarRight";
import BaseLayout from "layouts/BaseLayout";
import SigninFields from "types/SigninFields";
import signinValidator from "validators/signinValidator";
import { updateSigninStatus } from "redux/reducers/account";
import { signin } from "redux/thunks/account";
import { storeDispatch, useAppSelector } from "redux/hooks";
import { AccountSigninStatus, AccountState } from "types/appTypes";
import { messagesStore } from "rx/messages";


export default function SigninPage() {

    const { register, handleSubmit, formState: { errors } } = useForm<SigninFields>({
        resolver: yupResolver(signinValidator),
        defaultValues: {
            source: "web"
        }
    });

    const accountState: AccountState = useAppSelector((state) => state.account);

    const { signinStatus, pendingRequest } = accountState;
    const navigate = useNavigate();

    const onSubmit = (data: SigninFields) => {
        storeDispatch(signin(data));
    }


    useEffect(() => {

        if (signinStatus === AccountSigninStatus.success) {

            messagesStore.push("success", "Il tuo account è stato creato, segui le istruzioni via email per attivarlo")

            storeDispatch(updateSigninStatus({
                status: null
            }))
            navigate("/account/login");
        }

    }, [signinStatus, navigate])

    return <>
        <BaseLayout title="Crea account">
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
                            <a className="text-light" href="/">Home</a>
                        </li>
                        <li className="breadcrumb-item active text-light" aria-current="page">Crea account</li>
                    </ol>
                </nav>
            </Row>
            <Row className="flex-grow-1 justify-content-center align-items-center">
                <div className="col-lg-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden"
                            {...register("source")}
                        />
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
                        <div className="form-group pt-2">
                            <label className="form-label">Email</label>
                            <input type="text"
                                {...register("email")}
                                className={errors.email ? "form-control is-invalid" : "form-control"} />
                            <div className="invalid-feedback">
                                {errors.email?.message}
                            </div>
                        </div>
                        <div className="form-group pt-2">
                            <label className="form-label">Password</label>
                            <input type="password"
                                {...register("password")}
                                className={errors.password ? "form-control is-invalid" : "form-control"} />
                            <div className="invalid-feedback">
                                {errors.password?.message}
                            </div>
                        </div>
                        <div className="form-group pt-2">
                            <label className="form-label">Conferma password</label>
                            <input type="password"
                                {...register("confirmPassword")}
                                className={errors.confirmPassword ? "form-control is-invalid" : "form-control"} />
                            <div className="invalid-feedback">
                                {errors.confirmPassword?.message}
                            </div>
                        </div>
                        <div className="form-group pt-4">
                            <button type="submit" className="btn btn-primary me-2">
                                {pendingRequest ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                                Crea account</button>
                        </div>
                    </form>
                </div>
            </Row>
        </BaseLayout>
    </>
}
