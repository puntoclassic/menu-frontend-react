import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom"
import { AppState } from "types/appTypes";
import { appStore } from "rx/app";


export default function Header() {

    const [appState, setAppState] = useState<AppState>();

    useLayoutEffect(() => {
        appStore.subscribe(setAppState);
    }, []);

    return <>
        <div className="col-lg-12 bg-primary d-flex justify-content-center align-items-center flex-column p-4">
            <div className="text-center">
                <Link to="/" className="text-decoration-none text-light">
                    <h2 className="app-title">{appState?.settings.site_name}</h2>
                    <p>{appState?.settings.site_subtitle}</p>
                </Link>
            </div>
        </div>
    </>
}