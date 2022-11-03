import { useSearchParams } from "react-router-dom";


export default function SearchForm({ defaultValue }: any) {
    const [searchParams] = useSearchParams();


    return <>
        <div className="row g-0 m-0">
            <div className="col-lg-12">
                <form className="row g-0 m-0 " method="get" action="/cerca">
                    <div className="col-md-10 col-lg-10 pe-1">
                        <input type="text" name="k" className="form-control" defaultValue={searchParams.get("k") ?? ""} />
                    </div>
                    <div className="col-md-2 col-lg-2 mt-1 mt-md-0">
                        <button type="submit" className="btn btn-outline-light">Cerca</button>
                    </div>
                </form>
            </div>
        </div>
    </>;

}