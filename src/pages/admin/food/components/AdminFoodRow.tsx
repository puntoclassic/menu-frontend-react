import { Link } from "react-router-dom";

export default function AdminFoodRow({ item }: any) {
    return <>
        <tr>
            <td className="col-lg-1">{item.id}</td>
            <td className="col-lg-4">{item.name}</td>
            <td className="col-lg-2">{parseFloat(item.price).toFixed(2)} €</td>
            <td className="col-lg-2">{item.category.name}</td>
            <td className="col-lg-3 text-center">
                <div className="btn-group">
                    <Link className="btn btn-secondary btn-sm" to={"/amministrazione/cibi/modifica/" + item.id} ><i className="bi bi-pencil-square me-2"></i>
                        Modifica</Link>
                    <Link className="btn btn-danger btn-sm" to={"/amministrazione/cibi/elimina/" + item.id}><i className="bi bi-trash  me-2"></i>
                        Elimina</Link>
                </div>
            </td>
        </tr >
    </>
}