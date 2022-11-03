import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import AccountManage from "components/AccountManage";
import CartButton from "components/CartButton";
import Header from "components/Header";
import HomeButton from "components/HomeButton";
import Messages from "components/Messages";
import Row from "components/Row";
import Topbar from "components/Topbar";
import TopbarLeft from "components/TopbarLeft";
import TopbarRight from "components/TopbarRight";
import BaseLayout from "layouts/BaseLayout";
import { storeDispatch } from "redux/hooks";
import { resendActivationEmail } from "redux/thunks/account";
import VerifyAccountFields from "types/VerifyAccountFields";
import verifyAccountValidator from "validators/verifyAccountValidator";


export default function VerificaAccountPage() {

    const { register, handleSubmit, formState: { errors } } = useForm<VerifyAccountFields>({
        resolver: yupResolver(verifyAccountValidator),
        defaultValues: {
            source: "web"
        }
    });

    const onSubmit = (data: VerifyAccountFields) => {
        storeDispatch(resendActivationEmail(data));
    }

    return <>
        <BaseLayout title="Verifica account">
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
                        <li className="breadcrumb-item active text-light" aria-current="page">Verifica account</li>
                    </ol>
                </nav>
            </Row>
            <Messages addClass="p-4"></Messages>
            <Row className="flex-grow-1 justify-content-center align-items-center">
                <div className="col-lg-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            <button type="submit" className="btn btn-primary me-2">Reinvia email</button>
                        </div>
                    </form>
                </div>
            </Row>
        </BaseLayout>
    </>
}
