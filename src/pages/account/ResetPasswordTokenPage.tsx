import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import Messages from "@src/components/Messages";
import Row from "@src/components/Row";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { storeDispatch, useAppSelector } from "@src/redux/hooks";
import { AccountState } from "@src/redux/types/reduxTypes";
import HomeButton from "@src/components/HomeButton";
import { resetPasswordByToken } from "@src/redux/thunks/account";
import resetPasswordTokenValidator from "@src/validators/resetPasswordTokenValidator";
import ResetPasswordTokenFields from "@src/types/ResetPasswordTokenFields";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function ResetPasswordTkenPage() {

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const accountState: AccountState = useAppSelector((state) => state.account);
    const { pendingRequest } = accountState;

    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [navigate, token])

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ResetPasswordTokenFields>({
        resolver: yupResolver(resetPasswordTokenValidator),
        defaultValues: {
            token: token!
        }
    });

    const onSubmit = async (data: ResetPasswordTokenFields) => {
        storeDispatch(resetPasswordByToken(data))
        reset();
    }
    return <>
        <BaseLayout title="Reset password">
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
                        <li className="breadcrumb-item active text-light" aria-current="page">Reset password</li>
                    </ol>
                </nav>
            </Row>
            <Messages addClass="p-4"></Messages>
            <Row className="p-4 flex-grow-1 justify-content-center align-items-center">
                <form className="col-lg-4" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden"
                        {...register("token")}
                    />
                    <div className="form-group pt-2">
                        <p>Inserisci la nuova password</p>
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
                            Reset password
                        </button>
                    </div>
                </form>
            </Row>

        </BaseLayout>
    </>
}


