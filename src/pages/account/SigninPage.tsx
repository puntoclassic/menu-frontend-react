import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Row from "@src/components/Row";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import SigninFields from "@src/types/SigninFields";
import signinValidator from "@src/validators/signinValidator";
import { updateSigninStatus } from "@src/redux/reducers/account";
import { pushMessage } from "@src/redux/reducers/messages";
import { signin } from "@src/redux/thunks/account";
import { storeDispatch, useAppSelector } from "@src/redux/hooks";
import { AccountSigninStatus, AccountState } from "@src/redux/types/reduxTypes";


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
            storeDispatch(pushMessage({
                "tag": "success",
                "message": "Il tuo account è stato creato, segui le istruzioni via email per attivarlo"
            }))
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
