import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from "react-router-dom";
import AccountManage from "components/AccountManage";
import CartButton from "components/CartButton";
import Header from "components/Header";
import HomeButton from "components/HomeButton";
import Row from "components/Row";
import Topbar from "components/Topbar";
import TopbarLeft from "components/TopbarLeft";
import TopbarRight from "components/TopbarRight";
import BaseLayout from "layouts/BaseLayout";

import ChangePasswordFields from "types/ChangePasswordFields";
import changePasswordValidator from "validators/changePasswordValidator";
import Messages from "components/Messages";
import { accountStore } from "rx/account";
import { messagesStore } from "rx/messages";
import { useLayoutEffect, useState } from "react";
import { AccountState } from "types/appTypes";


export default function ChangePasswordPage() {
    const [isPending, setIsPending] = useState(false);
    const [accountState, setAccountState] = useState<AccountState>();

    useLayoutEffect(() => {
        accountStore.subscribe(setAccountState);
    }, []);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ChangePasswordFields>({
        resolver: yupResolver(changePasswordValidator),
        defaultValues: {
            email: accountState?.user.email
        },
        reValidateMode: "onSubmit"
    });



    const onSubmit = (data: ChangePasswordFields) => {
        setIsPending(true);
        accountStore.updatePassword(data).subscribe({
            next: (value: any) => {
                if (value.status === "Success") {
                    messagesStore.push(
                        "success",
                        "Password cambiata con successo",
                    );
                }
                if (value.status === "BadCurrentPassword") {
                    messagesStore.push(
                        "error",
                        "La password attuale è errata",
                    );
                }
                if (value.status === "Error") {
                    messagesStore.push(
                        "error",
                        "Si è verificato un errore inaspettato",
                    );
                }
                setIsPending(false);
            },
            error: () => {
                setIsPending(false);
                messagesStore.push(
                    "error",
                    "Si è verificato un errore inaspettato",
                );
            }
        });
        reset()
    }

    return <>
        <BaseLayout title="Cambia password">
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
                            <Link className="text-light" to="/account">Profilo</Link>
                        </li>
                        <li className="breadcrumb-item active text-light" aria-current="page">Cambia password</li>
                    </ol>
                </nav>
            </Row>
            <Row>
                <Messages addClass="ps-4 pe-4 pt-4"></Messages>
            </Row>
            <Row className="flex-grow-1 ps-4 pe-4 pt-4">
                <div className="col-lg-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden"
                            {...register("email")}
                        />
                        <div className="form-group pt-2">
                            <label className="form-label">Password attuale</label>
                            <input type="password"
                                {...register("currentPassword")}
                                className={errors.currentPassword ? "form-control is-invalid" : "form-control"} />
                            <div className="invalid-feedback">
                                {errors.currentPassword?.message}
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
                                {isPending ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                                Cambia password</button>
                        </div>
                    </form>
                </div>
            </Row>
        </BaseLayout>
    </>
}
