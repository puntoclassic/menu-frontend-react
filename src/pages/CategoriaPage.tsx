import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import CategoryPills from "@src/components/CategoryPills";
import FoodItem from "@src/components/FoodItem";
import Header from "@src/components/Header";
import Row from "@src/components/Row";
import SearchForm from "@src/components/SearchForm";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import categoryService from "@src/services/categoryService";
import foodService from "@src/services/foodService";

export default function CategoriaPage() {

    const { slug } = useParams();

    const [category, setCategory]: any = useState(null);
    const [foods, setFoods]: [] | any = useState(null);

    const { name } = category ?? { name: "" };

    useEffect(() => {

        setCategory(null);
        setFoods(null);

        categoryService.getCategoryBySlug(slug!).then((response: any) => {
            setCategory(response.data);
        })

        foodService.getFoodsByCategorySlug(slug!).then((response: any) => {
            setFoods(response.data);
        });

    }, [slug])

    const foodsRender = () => {
        return foods.map((item: any) => <FoodItem item={item} key={item.id}></FoodItem>);
    }

    const content = () => {
        if (category && foods) {
            return <>
                <div className="col-lg-12 p-4 d-flex flex-grow-1 flex-column">
                    <div className="row g-0">
                        <h4 className="fw-light">Categoria {category.name.toLowerCase()}</h4>
                    </div>
                    <div className="row g-0">
                        {foods.length === 0 ? <p>Non ci sono cibi per questa categoria</p> : null}
                        {foods ? foodsRender() : null}
                    </div>
                </div>
            </>
        } else {
            return <>
                <div className="col-lg-12 p-4 d-flex flex-grow-1 justify-content-center align-items-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </>
        }
    }

    return <>

        <BaseLayout title={name || "Categoria"}>
            <Row>
                <Topbar>
                    <TopbarLeft>
                        <SearchForm></SearchForm>
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
            <Row>
                <CategoryPills></CategoryPills>
            </Row>
            <Row className="d-flex flex-grow-1">
                {content()}
            </Row>
        </BaseLayout>
    </>

}
