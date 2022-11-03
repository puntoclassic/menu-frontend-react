import { Link } from "react-router-dom";

export default function AdminCategoryRow({ item }: any) {
    return <>
        <tr>
            <td className="col-lg-1">{item.id}</td>
            <td className="col-lg-7">{item.name}</td>
            <td className="col-lg-4 text-center">
                <div className="btn-group">
                    <Link className="btn btn-secondary btn-sm" to={"/amministrazione/categorie/modifica/" + item.id} ><i className="bi bi-pencil-square me-2"></i>
                        Modifica</Link>
                    <Link className="btn btn-danger btn-sm" to={"/amministrazione/categorie/elimina/" + item.id}><i className="bi bi-trash  me-2"></i>
                        Elimina</Link>
                </div>
            </td>
        </tr >
    </>
}