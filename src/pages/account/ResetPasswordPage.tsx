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

import { storeDispatch, useAppSelector } from "redux/hooks";
import { AccountState } from "types/appTypes";
import ResetPasswordFields from "types/ResetPasswordFields";
import HomeButton from "components/HomeButton";
import { resetPassword } from "redux/thunks/account";
import resetPasswordValidator from "validators/resetPasswordValidator";

export default function ResetPasswordPage() {

    const accountState: AccountState = useAppSelector((state) => state.account);
    const { pendingRequest } = accountState;

    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFields>({
        resolver: yupResolver(resetPasswordValidator),
        defaultValues: {
            source: "web"
        }
    });

    const onSubmit = async (data: ResetPasswordFields) => {
        storeDispatch(resetPassword(data))
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
                        {...register("source")}
                    />
                    <div className="form-group pt-2">
                        <label className="form-label">Email</label>
                        <input type="text"
                            {...register("email")}
                            className={errors.email ? "form-control is-invalid" : "form-control"} />
                        <div className="invalid-feedback">
                            {errors.email?.message}
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


