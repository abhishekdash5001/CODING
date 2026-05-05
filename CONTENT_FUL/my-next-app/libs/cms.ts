// lib/cms.ts

export type CMSPage = {
    region: string;
    locale: string;
    slug: string;
    title: string;
    description: string;
  };
  
  const pages: CMSPage[] = [
    {
      region: "us",
      locale: "en",
      slug: "/",
      title: "Welcome to DAP US",
      description: "US English home page",
    },
    {
      region: "us",
      locale: "es",
      slug: "/",
      title: "Bienvenido a DAP US",
      description: "US Spanish home page",
    },
    {
      region: "ca",
      locale: "en",
      slug: "/",
      title: "Welcome to DAP Canada",
      description: "Canada English home page",
    },
    {
      region: "ca",
      locale: "fr",
      slug: "/",
      title: "Bienvenue chez DAP Canada",
      description: "Canada French home page",
    },
    {
      region: "in",
      locale: "en",
      slug: "/",
      title: "Welcome to DAP India",
      description: "India English home page",
    },
    {
      region: "us",
      locale: "en",
      slug: "/about",
      title: "About DAP",
      description: "About DAP in US English",
    },
    {
      region: "us",
      locale: "es",
      slug: "/about",
      title: "Sobre DAP",
      description: "About DAP in US Spanish",
    },
    {
      region: "ca",
      locale: "fr",
      slug: "/about",
      title: "À propos de DAP",
      description: "About DAP in Canadian French",
    },
    {
      region: "in",
      locale: "en",
      slug: "/products/wall-putty",
      title: "Wall Putty",
      description: "Wall Putty available in India",
    },
  ];
  
  export async function getCMSPage({
    region,
    locale,
    slug,
  }: {
    region: string;
    locale: string;
    slug: string;
  }) {
   
    return (
      pages.find(
        (page) =>
          page.region === region &&
          page.locale === locale &&
          page.slug === slug
      ) ?? null
    );
  }

  export async function getAllCMSPages() {

    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(pages)
        })
    })
  
  }