import { useSelector } from "react-redux"
import CategoryPill from "@src/components/CategoryPill";


export default function CategoryPills() {
    const appState = useSelector((state: any) => state.app);
    const { categories } = appState;

    return <>
        <div className="col-lg-12">
            <div className="row g-0  pt-2 pb-2  bg-secondary">
                <div className="col-lg-12 d-flex justify-content-center align-items-center ">
                    <div className="row g-0">
                        <div className="col-lg-12 d-flex justify-content-center align-items-center">
                            <ul className="nav flex-column flex-md-row category-pills">
                                {categories.map((cat: any) => <CategoryPill item={cat} key={cat.id}></CategoryPill>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
