import { Link } from "react-router-dom";
import { useAppSelector } from "@src/redux/hooks";


export default function DashboardAdmin() {

    const accountState = useAppSelector((state) => state.account);

    const { user } = accountState;

    if (user.role === "admin") {
        return <>
            <div className="row g-0">
                <div className="row g-0 mt-3">
                    <div className="col-lg-4">
                        <ul style={{ listStyleType: 'none' }} className="p-0">
                            <li>
                                <h4>Amministrazione</h4>
                            </li>
                            <li>
                                <h6 className="mt-1">CATALOGO</h6>
                            </li>
                            <li>
                                <Link className="text-decoration-none" to="/amministrazione/categorie"><i className="bi bi-archive me-2"></i>Categorie</Link>
                            </li>
                            <li>
                                <Link className="text-decoration-none" to="/amministrazione/cibi"><i className="bi bi-book me-2"></i>Cibi</Link>
                            </li>
                            <li>
                                <h6 className="mt-3">VENDITE</h6>
                            </li>
                            <li>
                                <a className="text-decoration-none" href="/amministrazione/clienti">Clienti</a>
                            </li>
                            <li>
                                <a className="text-decoration-none" href="/amministrazione/ordini">Ordini</a>
                            </li>

                            <li>
                                <h6 className="mt-3">IMPOSTAZIONI</h6>
                            </li>
                            <li>
                                <Link className="text-decoration-none" to="/amministrazione/impostazioni/generali">Generali</Link>
                            </li>
                            <li>
                                <Link className="text-decoration-none" to="/amministrazione/impostazioni/statiOrdine/">Stati ordine</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>

    } else {
        return null;
    }

}
