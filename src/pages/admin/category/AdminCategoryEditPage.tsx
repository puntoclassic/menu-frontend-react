import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import CategoryFields from "@src/types/CategoryFields";
import categoryValidator from "@src/validators/categoryValidator";
import { useForm } from "react-hook-form";
import { storeDispatch } from "@src/redux/hooks";
import configService from "@src/services/configService";
import { pushMessage } from "@src/redux/reducers/messages";
import categoryService from "@src/services/categoryService";


export default function AdminCategoryEditPage() {

    const { id } = useParams();

    const [category, setCategory]: any = useState();


    const [isPending, setIsPending] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<CategoryFields>({
        resolver: yupResolver(categoryValidator)
    });

    const fetchData = useCallback(async () => {
        var response = await categoryService.getCategory(parseInt(id!));
        const { name, image_url } = response.data;
        if (name) {

            setCategory({
                "name": name,
                "image_url": image_url
            })

            setValue("name", name);
            setValue("id", parseInt(id as string))
        }
    }, [id, setValue]);


    useEffect(() => {
        fetchData();
    }, [id, fetchData, isPending])




    const onSubmit = async (data: CategoryFields) => {

        setIsPending(true);

        if (await categoryService.updateCategory(data)) {
            storeDispatch(pushMessage({
                tag: "success",
                message: "Categoria aggiornata",
            }));
        } else {
            storeDispatch(pushMessage({
                tag: "error",
                message: "Si è verificato un errore",
            }));
        }
        setIsPending(false);

    }

    const currentImage = () => {
        if (category && category.image_url) {
            return <>
                <div className="form-group pt-2">
                    <label className="form-label">Immagine attuale</label>
                    <div className="col-lg-4">
                        <img src={configService.backendUrl() + category.image_url} alt={"Immagine categoria " + category.name} height="100" />
                    </div>
                </div>
            </>
        }
        return null;
    }


    return <>
        <BaseLayout title="Categoria">
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
                        <li className="breadcrumb-item active text-light" aria-current="page">Modifica categoria</li>
                    </ol>
                </nav>
            </Row>
            <Row>
                <Messages addClass="ps-4 pe-4 pt-4"></Messages>
            </Row>

            <Row className="p-4">
                <form className="col-lg-4" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register("id")}></input>
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
                    {currentImage()}

                    <div className="form-group pt-4">
                        <button type="submit" className="btn btn-success me-2">
                            {isPending ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                            Aggiorna
                        </button>
                    </div>
                </form>
            </Row>
        </BaseLayout>
    </>
}
