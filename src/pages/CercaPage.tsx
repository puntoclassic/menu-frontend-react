import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AccountManage from "@src/components/AccountManage";
import CartButton from "@src/components/CartButton";
import FoodItemWithCategory from "@src/components/FoodItemWithCategory";
import Header from "@src/components/Header";
import Row from "@src/components/Row";
import SearchForm from "@src/components/SearchForm";
import Topbar from "@src/components/Topbar";
import TopbarLeft from "@src/components/TopbarLeft";
import TopbarRight from "@src/components/TopbarRight";
import BaseLayout from "@src/layouts/BaseLayout";
import foodService from "@src/services/foodService";


export default function CercaPage() {
    const [searchParams] = useSearchParams();
    const k = searchParams.get("k");
    const navigate = useNavigate();
    const [searchResults, setSearchResults]: any[] = useState(null);

    useEffect(() => {

        if (!k) {
            navigate("/")
        } else {
            setSearchResults(null);
            foodService.searchFoods(k).then((response) => {
                var { foods } = response.data;
                setSearchResults(foods);
            })
        }
    }, [k, navigate])

    const searchResultsRender = () => {
        return searchResults.map((item: any) => <FoodItemWithCategory item={item} key={item.id}></FoodItemWithCategory>);
    }

    const content = () => {
        if (searchResults) {
            return <>
                <div className="col-lg-12 p-4 d-flex flex-grow-1 flex-column">
                    <div className="row g-0">
                        <h4 className="fw-light">Risultati di ricerca per "{k}"</h4>
                    </div>
                    <div className="row g-0">
                        {searchResults.length === 0 ? <p>Nessun risultato trovato</p> : null}
                        {searchResults ? searchResultsRender() : null}
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
        <BaseLayout title={"Risultati di ricerca"}>
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
                <div className="col-lg-12 bg-secondary p-3">
                    <div className="row g-0">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">
                                    <Link className="text-light" to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active text-light" aria-current="page">Ricerca</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </Row>
            <Row className="d-flex flex-grow-1">
                {content()}
            </Row>
        </BaseLayout>
    </>
}
