import { getCMSPage, getAllCMSPages, type CMSPage } from "@/libs/cms";
import type { Metadata } from "next";

import {
  isValidRegion,
  isValidRegionForLocale,
  type Locales,
} from "@/libs/i18n";

import { notFound } from "next/navigation";



type PageProps = {
  params: Promise<{
    region: string;
    locale: Locales;
    slug?: string[];
  }>;
};

export async function generateMetadata({params}:PageProps):Promise<Metadata>{
    const { locale, region, slug } = await params;
    const page = await getCMSPage({ region, locale, slug: normalizeSLug(slug) });

    if(!page){
        return {
            title:'page not found',
            description:'description'
        }
    }
    else{
        return {
            title:page.title,
            description:page.description
        }
    }

}

export async function generateStaticParams() {
  const pages: CMSPage[] = await getAllCMSPages();
  return pages.map((page: CMSPage) => {
    return {
      locale: page.locale,
      region: page.region,
      slug: page.slug === "/" ? [] : page.slug.split("/"),
    };
  });
}

function normalizeSLug(slug: string[] | undefined) {
  if (slug) {
    return '/'+slug.join("/");
  }
  return "/";
}

export default async function Page({ params }: PageProps) {
  const { locale, region, slug } = await params;
  const page= await getCMSPage({ region, locale, slug: normalizeSLug(slug) });

  if (!page) {
    notFound();
  }

  if (!isValidRegion(region)) {
    notFound();
  }

  if (!isValidRegionForLocale(region, locale)) {
    notFound();
  }
  return (
    <div className="flex flex-col ">
       <p>
       {page.title}
        </p>
        <p>
        {page.description}
        </p>
       
     
    </div>
  );
}
