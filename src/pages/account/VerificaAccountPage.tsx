import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import Header from "@src/components/Header";
import HomeButton from "@src/components/HomeButton";
import Messages from "@src/components/Messages";
import Row from "@src/components/Row";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import { storeDispatch } from "@src/redux/hooks";
import { resendActivationEmail } from "@src/redux/thunks/account";
import VerifyAccountFields from "@src/types/VerifyAccountFields";
import verifyAccountValidator from "@src/validators/verifyAccountValidator";


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
