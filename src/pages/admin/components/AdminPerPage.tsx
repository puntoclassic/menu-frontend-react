import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


export default function AdminPerPage({ onChangeHandler, currentValue }: any) {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        searchParams.set("perPage", currentValue);
        //setSearchParams(searchParams);
    }, [currentValue, setSearchParams, searchParams])

    return <>
        <div className="col-lg-2">
            <label className="form-label">Elementi per pagina</label>
            <select name="elementsPerPage" defaultValue={currentValue} className="form-control" onChange={(e) => { onChangeHandler(e.target.value); }}>
                {[2, 5, 10, 20, 50].map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
        </div>
    </>
}


