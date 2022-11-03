
export default function TopbarRight({ children }: any) {
    return <>
        <div
            className="col-lg-4 d-flex justify-content-center justify-content-md-center justify-content-lg-end align-items-center p-2">
            {children}
        </div>
    </>
}