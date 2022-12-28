import AddToCartButton from "components/AddToCartButton";

export default function FoodItem({ item }: any) {
    return <>
        <div className="row g-0 my-2">
            <div className="col-lg-8">
                <div className="g-0 row">
                    <div className="col-lg-12 fs-5">{item.name}</div>
                    <div className="col-lg-12 fs-6 fw-light">{item.ingredients}</div>
                </div>
            </div>
            <div className="col-lg-4 d-flex justify-content-end align-items-center">
                <span>{parseFloat(item.price).toFixed(2)} €</span>
                <AddToCartButton item={item}></AddToCartButton>
            </div>
        </div>
    </>
}