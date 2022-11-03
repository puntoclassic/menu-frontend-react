

export default function Row({ className, children }: any) {
    return <>
        <div className={"row g-0 " + (className ?? "")}>
            {children}
        </div>
    </>
}