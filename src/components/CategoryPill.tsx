import { Link, useLocation } from "react-router-dom"


export default function CategoryPill({ item }: any) {
    const location = useLocation();
    var classes = "nav-link nav-pill-item me-2 text-light"

    if (location.pathname.endsWith(item.slug)) {
        classes = "nav-link nav-pill-item active me-2 text-light"
    }

    return <>
        <li className="nav-item text-center my-1 md-my-0 lg-my-0">
            <Link className={classes} to={"/menu/categoria/" + item.slug}>{item.name}</Link>
        </li>
    </>
}