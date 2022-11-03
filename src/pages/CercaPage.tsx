import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AccountManage from "components/AccountManage";
import CartButton from "components/CartButton";
import FoodItemWithCategory from "components/FoodItemWithCategory";
import Header from "components/Header";
import Row from "components/Row";
import SearchForm from "components/SearchForm";
import Topbar from "components/Topbar";
import TopbarLeft from "components/TopbarLeft";
import TopbarRight from "components/TopbarRight";
import BaseLayout from "layouts/BaseLayout";
import foodService from "services/foodService";


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
