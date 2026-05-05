import { isValidRegion ,isValidRegionForLocale,type Locales} from "@/libs/i18n";
import type { Metadata } from "next";
import { notFound } from "next/navigation";




type RegionLocaleLayoutType={
    children:React.ReactNode
    params:Promise<{
        region:string,
        locale:Locales
    }>
}

export const metadata:Metadata={
    title:'region and locale',
    description:'description'
}



export default  async function RegionLocaleLayout({children,params}:RegionLocaleLayoutType){



    return <div className="regionLocaleLayout">
        {children}

    </div>

}