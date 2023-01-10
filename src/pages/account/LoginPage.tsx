import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import Messages from "@src/components/Messages";
import Row from "@src/components/Row";
import SearchForm from "@src/components/SearchForm";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import loginValidator from "@src/validators/loginValidator";
import LoginFields from "@src/types/LoginFields";
import { useEffect } from "react";
import { login } from "@src/redux/thunks/account";
import { storeDispatch, useAppSelector } from "@src/redux/hooks";
import { AccountState } from "@src/redux/types/reduxTypes";

export default function LoginPage() {

    const [searchParams] = useSearchParams();
    const backUrl = searchParams.get("backUrl");
    const accountState: AccountState = useAppSelector((state) => state.account);
    const { user, pendingRequest } = accountState;
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFields>({
        resolver: yupResolver(loginValidator)
    });

    const onSubmit = async (data: LoginFields) => {
        storeDispatch(login(data.email, data.password))
    }

    useEffect(() => {

        if (user && user.verified) {
            navigate(backUrl || "/account", { replace: true })
        }

    }, [user, navigate, backUrl])

    return <>
        <BaseLayout title="Accedi">
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
                            <a className="text-light" href="/">Home</a>
                        </li>
                        <li className="breadcrumb-item active text-light" aria-current="page">Accedi</li>
                    </ol>
                </nav>
            </Row>
            <Messages addClass="p-4"></Messages>
            <Row className="p-4 flex-grow-1 justify-content-center align-items-center">
                <form className="col-lg-4" onSubmit={handleSubmit(onSubmit)}>
                    {backUrl ? <input type="hidden" {...register("backUrl")} name="backUrl" value={backUrl} /> : null}
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
                        <Link to="/account/resetPassword" className="text-decoration-none">
                            Ho dimenticato la password
                        </Link>
                        <br />
                        <Link to="/account/verificaAccount" className="text-decoration-none">
                            Il mio account non è attivo
                        </Link>
                    </div>
                    <div className="form-group pt-4">
                        <button type="submit" className="btn btn-primary me-2">
                            {pendingRequest ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                            Accedi
                        </button>
                        <Link to="/account/signin" className="btn btn-secondary">
                            Crea account
                        </Link>
                    </div>
                </form>
            </Row>

        </BaseLayout>
    </>
}


