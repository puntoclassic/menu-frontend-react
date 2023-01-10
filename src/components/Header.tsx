import { Link } from "react-router-dom"
import { useAppSelector } from "@src/redux/hooks";


export default function Header() {

    const appState = useAppSelector((state) => state.app);

    const { settings } = appState;
    return <>
        <div className="col-lg-12 bg-primary d-flex justify-content-center align-items-center flex-column p-4">
            <div className="text-center">
                <Link to="/" className="text-decoration-none text-light">
                    <h2 className="app-title">{settings.site_name}</h2>
                    <p>{settings.site_subtitle}</p>
                </Link>
            </div>
        </div>
    </>
}
