import { Link } from "react-router-dom";


export default function HomeButton() {
    return <>
        <Link className="btn btn-link text-light text-decoration-none"
            to="/"><i className="bi bi-house pe-2"></i>Home</Link>
    </>
}