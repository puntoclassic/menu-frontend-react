import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountManage from "components/AccountManage";
import CartButton from "components/CartButton";
import Header from "components/Header";
import HomeButton from "components/HomeButton";
import Row from "components/Row";
import Topbar from "components/Topbar";
import TopbarLeft from "components/TopbarLeft";
import TopbarRight from "components/TopbarRight";
import BaseLayout from "layouts/BaseLayout";
import CategoryFields from "types/CategoryFields";
import categoryValidator from "validators/categoryValidator";
import { useForm } from "react-hook-form";
import categoryService from "services/categoryService";
import { messagesStore } from "rx/messages";


export default function AdminCategoryCreatePage() {

    const navigate = useNavigate();


    const [isPending, setIsPending] = useState(false);

    const { register, handleSubmit, formState: { errors }, } = useForm<CategoryFields>({
        resolver: yupResolver(categoryValidator)
    });

    const onSubmit = async (data: CategoryFields) => {
        setIsPending(true);
        if (await categoryService.createCategory(data)) {
            messagesStore.push("success", "Categoria creata")
        } else {
            messagesStore.push("error", "Si è verificato un errore")
        }
        navigate("/amministrazione/categorie");
        setIsPending(false);
    }

    return <>
        <BaseLayout title="Nuova categoria">
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
                        <li className="breadcrumb-item">
                            <Link className="text-light" to="/amministrazione/categorie">Categorie</Link>
                        </li>
                        <li className="breadcrumb-item active text-light" aria-current="page">Crea categoria</li>
                    </ol>
                </nav>
            </Row>

            <Row className="p-4">
                <form className="col-lg-4" onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group pt-2">
                        <label className="form-label">Nome</label>
                        <input type="text"
                            {...register("name")}
                            className={errors.name ? "form-control is-invalid" : "form-control"} />
                        <div className="invalid-feedback">
                            {errors.name?.message}
                        </div>
                    </div>
                    <div className="form-group pt-2">
                        <label className="form-label">Immagine</label>
                        <input type="file"
                            {...register("image")}
                            className={errors.image ? "form-control is-invalid" : "form-control"} />
                        <div className="invalid-feedback">
                            {errors.image?.message}
                        </div>
                    </div>

                    <div className="form-group pt-4">
                        <button type="submit" className="btn btn-success me-2">
                            {isPending ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                            Crea
                        </button>
                    </div>
                </form>
            </Row>
        </BaseLayout>
    </>
}
