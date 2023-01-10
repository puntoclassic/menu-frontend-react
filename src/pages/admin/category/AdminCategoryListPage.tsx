import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
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
import { useEffect, useState } from "react";
import AdminCategoryRow from "@src/pages/admin/category/components/AdminCategoryRow";
import AdminPagination from "@src/pages/admin/components/AdminPagination";
import AdminPerPage from "@src/pages/admin/components/AdminPerPage";
import SearchFields from "@src/types/admin/SearchFields";
import categoryService from "@src/services/categoryService";

export default function AdminCategoryListPage() {

    const [searchParams, setSearchParams] = useSearchParams();
    const { register, handleSubmit, } = useForm<SearchFields>({
        defaultValues: {
            search: searchParams.get("search") ?? ""
        }
    });

    const [perPage, setPerPage] = useState(parseInt(searchParams.get("perPage") ?? "5"));
    const [page, setPage] = useState(parseInt(searchParams.get("page") ?? "1"));
    const [orderBy, setOrderBy] = useState(searchParams.get("orderBy") ?? "id");
    const [ascending, setAscending] = useState((searchParams.get("ascending") ?? "true") === "true");
    const [searchKey, setSearchKey] = useState(searchParams.get("search") ?? "");
    const [categories, setCategories] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [count, setCount] = useState(0);

    const onSubmit = async (data: SearchFields) => {
        setSearchKey(data.search);
    }

    useEffect(() => {
        searchParams.delete("search");

        if (searchKey !== "") {
            searchParams.set("search", searchKey);
        }
        setSearchParams(searchParams, { replace: true });

    }, [searchKey, searchParams, setSearchParams])


    useEffect(() => {

        const fetchData = async () => {

            setIsPending(true);

            var response = await categoryService.adminFetchCategories({
                ascend: ascending,
                orderBy: orderBy,
                page: page,
                perPage: perPage,
                search: searchKey,
            });

            if (response.status === "success") {
                const { categories, count } = response;
                setCategories(categories);
                setCount(count);
            }

            setIsPending(false);

        }
        fetchData();
    }, [searchKey, ascending, orderBy, page, perPage])

    const toggleOrder = (by: string) => {
        if (by === orderBy) {
            setAscending(!ascending)
        } else {
            setOrderBy(by);
            setAscending(true);
        }
    }

    const content = () => {

        if (!isPending) {
            return <>
                <table className="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th scope="col"><button className={"btn btn-link p-0 " + (orderBy === "id" ? "fw-bold" : "")} onClick={(e) => { e.preventDefault(); toggleOrder("id") }}>{orderBy === "id" ? <>
                                <i className={"me-2 bi " + (ascending ? "bi-sort-up" : "bi-sort-down")}
                                ></i>
                            </> : null}#</button></th>
                            <th scope="col"><button className={"btn btn-link p-0 " + (orderBy === "name" ? "fw-bold" : "")} onClick={(e) => { e.preventDefault(); toggleOrder("name") }}> {orderBy === "name" ? <>
                                <i className={"me-2 bi " + (ascending ? "bi-sort-up" : "bi-sort-down")}
                                ></i>
                            </> : null}Nome</button></th>
                            <th className="text-center" scope="col">Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map((row: any) => <AdminCategoryRow item={row} key={row.id}></AdminCategoryRow>)}
                    </tbody>
                </table>
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
        <BaseLayout title="Categorie">
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
                        <li className="breadcrumb-item active text-light" aria-current="page">Amministrazione categorie</li>
                    </ol>
                </nav>
            </Row>
            <Row>
                <Messages addClass="ps-4 pe-4 pt-4"></Messages>
            </Row>
            <Row className="ps-4 pe-4 pt-4">
                <div className="col-lg-12">
                    <h4>Categorie</h4>
                </div>
            </Row>
            <Row className="bg-light ms-4 me-4 mb-4 p-2 rounded-2 shadow-sm d-flex flex-row justify-content-end align-items-center">
                <div className="col-lg-9 mt-md-0">
                    <Link to="/amministrazione/categorie/crea" className="btn btn-secondary text-decoration-none">Crea nuova categoria</Link>
                </div>
                <div className="col-lg-3 mt-3 mt-md-0">
                    <form className="m-0" onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group">
                            <input {...register("search")} type="text" className="form-control" placeholder="Cerca una categoria" />
                            <button type="submit" className="btn btn-primary" >
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </Row>
            <Row className="ps-4 pe-4 d-flex flex-grow-1 flex-column">
                {content()}
            </Row>
            <Row className="ps-4 pe-4 pb-4">
                <AdminPerPage currentValue={perPage} onChangeHandler={(value: number) => { setPerPage(value); setPage(1) }}></AdminPerPage>
            </Row>
            <Row className="ps-4 pe-4">
                <AdminPagination currentValue={page} onChangeHandler={(value: number) => setPage(value)} itemsCount={count} perPage={perPage}></AdminPagination>
            </Row>
        </BaseLayout >
    </>
}
