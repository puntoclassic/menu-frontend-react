
export default function TopbarLeft({ children }: any) {
    return <>
        <div
            className="col-lg-8 d-flex justify-content-center justify-content-md-center justify-content-lg-start align-items-center p-2">
            {children}
        </div>
    </>
}