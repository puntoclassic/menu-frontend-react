import Row from "components/Row";


export default function Topbar({ children }: any) {
    return <>
        <div className="col-lg-12">
            <Row className="bg-primary">
                {children}
            </Row>
        </div>
    </>
}