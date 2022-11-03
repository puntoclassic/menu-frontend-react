import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


export default function AdminPagination({ currentValue, onChangeHandler, itemsCount, perPage }: any) {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        searchParams.set("page", currentValue);
        setSearchParams(searchParams);
    }, [currentValue, setSearchParams, searchParams])


    var pages = Math.ceil(itemsCount / perPage);

    const renderPage = (num: number) => {
        return <li key={num} className={num === currentValue ? "page-item active" : "page-item"}><a onClick={(e) => { e.preventDefault(); onChangeHandler(num); }} className="page-link" href={"?page=" + num}>{num}</a></li>
    }

    const nextButton = () => {
        var num = currentValue + 1;

        return <li key={num} className={currentValue < pages ? "page-item" : "page-item disabled"}><a onClick={(e) => { e.preventDefault(); onChangeHandler(num); }} className="page-link" href={"?page=" + num}>Prossima</a></li>
    }

    const previuousButton = () => {
        var num = currentValue - 1;

        return <li key={num} className={currentValue > 1 ? "page-item" : "page-item disabled"}><a onClick={(e) => { e.preventDefault(); onChangeHandler(num); }} className="page-link" href={"?page=" + num}>Precedente</a></li>
    }

    return <>
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {previuousButton()}
                {[...Array(pages)].map((num: number, index: number) => renderPage(index + 1))}
                {nextButton()}
            </ul>
        </nav>
    </>
}