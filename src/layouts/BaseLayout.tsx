import { Helmet } from "react-helmet"
import { useAppSelector } from "redux/hooks"

export default function BaseLayout({ title, children }: any) {
    const appState = useAppSelector((state) => state.app);

    const { settings } = appState;


    var site_name = ` :: ${(settings.site_name ?? "")}`

    return <>
        <Helmet>
            <title>{title}{site_name}</title>
        </Helmet>
        {children}
    </>
}