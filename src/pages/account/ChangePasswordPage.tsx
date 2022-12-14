import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from "react-router-dom";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Row from "@src/components/Row";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { updatePassword } from "@src/redux/thunks/account";
import { storeDispatch, useAppSelector } from "@src/redux/hooks";
import { AccountState } from "@src/redux/types/reduxTypes";
import ChangePasswordFields from "@src/types/ChangePasswordFields";
import changePasswordValidator from "@src/validators/changePasswordValidator";
import Messages from "@src/components/Messages";


export default function ChangePasswordPage() {
    const accountState: AccountState = useAppSelector((state) => state.account);
    const { user } = accountState;


    const { register, handleSubmit, formState: { errors }, reset } = useForm<ChangePasswordFields>({
        resolver: yupResolver(changePasswordValidator),
        defaultValues: {
            email: user.email
        },
        reValidateMode: "onSubmit"
    });


    const { pendingRequest } = accountState;

    const onSubmit = (data: ChangePasswordFields) => {
        storeDispatch(updatePassword(data));
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
                                {pendingRequest ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                                Cambia password</button>
                        </div>
                    </form>
                </div>
            </Row>
        </BaseLayout>
    </>
}
