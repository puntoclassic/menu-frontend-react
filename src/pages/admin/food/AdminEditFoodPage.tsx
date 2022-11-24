import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccountManage from "components/AccountManage";
import CartButton from "components/CartButton";
import Header from "components/Header";
import HomeButton from "components/HomeButton";
import Row from "components/Row";
import Topbar from "components/Topbar";
import TopbarLeft from "components/TopbarLeft";
import TopbarRight from "components/TopbarRight";
import BaseLayout from "layouts/BaseLayout";
import { useForm } from "react-hook-form";
import FoodFields from "types/admin/FoodFields";
import foodValidator from "validators/foodValidator";
import Messages from "components/Messages";
import foodService from "services/foodService";
import categoryService from "services/categoryService";
import { messagesStore } from "rx/messages";


export default function AdminCategoryFoodPage() {

    const { id } = useParams();

    const [categories, setCategories] = useState([]);
    const [isPending, setIsPending] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FoodFields>({
        resolver: yupResolver(foodValidator)
    });

    const onSubmit = async (data: FoodFields) => {

        setIsPending(true);

        if (await foodService.updateFood(data)) {

            messagesStore.push("success", "Cibo aggiornato")

        }

        setIsPending(false);
    }

    const fetchData = useCallback(async () => {
        var response = await foodService.getFood(parseInt(id!));
        const { name, ingredients, price, categoryId } = response.data;
        if (name) {
            setValue("name", name);
            setValue("ingredients", ingredients);
            setValue("price", price)
            setValue("category_id", categoryId)
            setValue("id", parseInt(id as string))
        }
    }, [id, setValue]);

    useEffect(() => {

        const fetchCategories = async () => {
            var response = await categoryService.fetchCategoriesForSelect();
            setCategories(response.data);
            if (response.data) {
                setValue("category_id", response.data[0].id);
            }
        }
        fetchCategories().then(() => {
            fetchData();
        });


    }, [setValue, fetchData]);

    return <>
        <BaseLayout title="Nuovo cibo">
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
                            <Link className="text-light" to="/amministrazione/cibi">Cibi</Link>
                        </li>
                        <li className="breadcrumb-item active text-light" aria-current="page">Modifica</li>
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
                        <label className="form-label">Ingredienti</label>
                        <textarea className="form-control" {...register("ingredients")}></textarea>
                    </div>
                    <div className="form-group pt-2">
                        <label className="form-label">Prezzo</label>
                        <input type="text"
                            {...register("price")}
                            className={errors.price ? "form-control is-invalid" : "form-control"} />
                        <div className="invalid-feedback">
                            {errors.price?.message}
                        </div>
                    </div>
                    <div className="form-group pt-2">
                        <label className="form-label">Categoria</label>
                        <select {...register("category_id")}
                            className={errors.category_id ? "form-control is-invalid" : "form-control"}>
                            {categories.map((cat: any) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                        <div className="invalid-feedback">
                            {errors.category_id?.message}
                        </div>
                    </div>

                    <div className="form-group pt-4">
                        <button type="submit" className="btn btn-success me-2">
                            {isPending ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                            Modifica
                        </button>
                    </div>
                </form>
            </Row>
        </BaseLayout>
    </>
}
