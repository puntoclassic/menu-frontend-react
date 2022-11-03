import { Link } from "react-router-dom";


export default function AdminOrderStateRow({ item }: any) {
    return <>
        <tr>
            <td className="col-lg-1">{item.id}</td>
            <td className="col-lg-6">{item.name}</td>
            <td className="col-lg-3"><span className={item.cssBadgeClass}>Esempio di testo</span></td>
            <td className="col-lg-2 text-center">
                <div className="btn-group">
                    <Link className="btn btn-secondary btn-sm" to={"/amministrazione/impostazioni/statiOrdine/modifica/" + item.id} ><i className="bi bi-pencil-square me-2"></i>
                        Modifica</Link>
                    <Link className="btn btn-danger btn-sm" to={"/amministrazione/impostazioni/statiOrdine/elimina/" + item.id}><i className="bi bi-trash  me-2"></i>
                        Elimina</Link>
                </div>
            </td>
        </tr >
    </>
}