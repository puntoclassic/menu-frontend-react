import { useState, useLayoutEffect } from "react";
import { Helmet } from "react-helmet"
import { AppState } from "types/appTypes";
import { appStore } from "rx/app";

export default function BaseLayout({ title, children }: any) {


    const [appState, setAppState] = useState<AppState>();

    useLayoutEffect(() => {
        appStore.subscribe(setAppState);
    }, []);


    var site_name = ` :: ${(appState?.settings.site_name ?? "")}`

    return <>
        <Helmet>
            <title>{title}{site_name}</title>
        </Helmet>
        {children}
    </>
}