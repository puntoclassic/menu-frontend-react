import AccountManage from "components/AccountManage";
import CartButton from "components/CartButton";
import CartRow from "pages/cart/components/CartRow";
import CategoryPills from "components/CategoryPills";
import CheckoutButton from "pages/cart/components/CheckoutButton";
import Header from "components/Header";
import HomeButton from "components/HomeButton";
import Messages from "components/Messages";
import Row from "components/Row";
import Topbar from "components/Topbar";
import TopbarLeft from "components/TopbarLeft";
import TopbarRight from "components/TopbarRight";
import BaseLayout from "layouts/BaseLayout";

import { useAppSelector } from "redux/hooks";
import { CartState } from "redux/types/reduxTypes";


export default function CarrelloPage() {

    const cartState: CartState = useAppSelector((state) => state.cart);
    const { items, total } = cartState;

    const content = () => {
        if (Object.keys(items).length > 0) {
            return <>
                <div className="col-lg-12 d-flex flex-grow-1 flex-column">
                    <div className="col-lg-12">
                        <div className="row g-0">
                            <div className="col-lg-12">
                                <div className="table-responsive">
                                    <table className="table table-striped align-middle">
                                        <thead>
                                            <tr>
                                                <th className="col-6">Cibo</th>
                                                <th className="col-2 text-center">Quantità</th>
                                                <th className="col-2 text-center">Prezzo</th>
                                                <th className="col-2 text-center">Azioni</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.values(items).map((row: any) => <CartRow actionsVisible={true} row={row} key={row.item.id}></CartRow>)}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td className="col-6"></td>
                                                <td className="col-2"></td>
                                                <td className="fw-bold text-center">Totale</td>
                                                <td className="text-center">{total.toFixed(2)} €</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            <div className="row g-0">
                                <div className="col-lg-4">
                                    <CheckoutButton></CheckoutButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        } else {
            return <>
                <p>Non ci sono elementi nel carrello</p>
            </>
        }
    }

    return <>
        <BaseLayout title="Carrello">
            <Row>
                <Topbar>
                    <TopbarLeft>
                        <HomeButton></HomeButton>
                    </TopbarLeft>
                    <TopbarRight>
                        <CartButton></CartButton>
                        <AccountManage></AccountManage>
                    </TopbarRight>
                </Topbar>
            </Row>
            <Row>
                <Header></Header>
            </Row>
            <Row>
                <CategoryPills></CategoryPills>
            </Row>
            <Messages addClass="p-4"></Messages>
            <Row className="d-flex flex-grow-1 flex-column">
                <div className="col-lg-12 p-4 my-3 flex-grow-1">
                    <Row>
                        {content()}
                    </Row>
                </div>
            </Row>
        </BaseLayout>
    </>
}
