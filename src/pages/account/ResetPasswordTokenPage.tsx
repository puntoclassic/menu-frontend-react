import AccountManage from "components/AccountManage";
import CartButton from "components/CartButton";
import Header from "components/Header";
import Messages from "components/Messages";
import Row from "components/Row";
import Topbar from "components/Topbar";
import TopbarLeft from "components/TopbarLeft";
import TopbarRight from "components/TopbarRight";
import BaseLayout from "layouts/BaseLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import HomeButton from "components/HomeButton";
import resetPasswordTokenValidator from "validators/resetPasswordTokenValidator";
import ResetPasswordTokenFields from "types/ResetPasswordTokenFields";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { accountStore } from "rx/account";
import { messagesStore } from "rx/messages";

export default function ResetPasswordTkenPage() {

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);


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
        setIsPending(true);
        accountStore.resetPasswordByToken(data).subscribe({
            next: () => {
                messagesStore.push(
                    "success",
                    "Password cambiata con successo",
                );
                setIsPending(false);

            },
            error: () => {
                messagesStore.push(
                    "error",
                    "Token non valido",
                );
                setIsPending(false);

            }
        })
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
                            {isPending ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                            Reset password
                        </button>
                    </div>
                </form>
            </Row>

        </BaseLayout>
    </>
}


