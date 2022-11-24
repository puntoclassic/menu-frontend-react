import CategoryPill from "components/CategoryPill";
import { useState, useLayoutEffect } from "react";
import { AppState } from "types/appTypes";
import { appStore } from "rx/app";


export default function CategoryPills() {

    const [appState, setAppState] = useState<AppState>();

    useLayoutEffect(() => {
        appStore.subscribe(setAppState);
    }, []);



    return <>
        <div className="col-lg-12">
            <div className="row g-0  pt-2 pb-2  bg-secondary">
                <div className="col-lg-12 d-flex justify-content-center align-items-center ">
                    <div className="row g-0">
                        <div className="col-lg-12 d-flex justify-content-center align-items-center">
                            <ul className="nav flex-column flex-md-row category-pills">
                                {appState?.categories.map((cat: any) => <CategoryPill item={cat} key={cat.id}></CategoryPill>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}