export const REGION_LOCALES:Record<string,Locales[]> = {
  us: ["en", "es"],
  ca: ["en", "fr"],
  in: ["en"],
} as const;

export type Regions = keyof typeof REGION_LOCALES;

export const LOCALES = {
  EN: "en",
  ES: "es",
  FR: "fr",
} as const;


export type Locales = (typeof LOCALES)[keyof typeof LOCALES]


export function isValidRegion(region:Regions){
  return  REGION_LOCALES.hasOwnProperty(region)
}


export function isValidRegionForLocale(region:Regions,locale:Locales){
   const a = REGION_LOCALES[region]
   if(!a){
    return false
   }
   return a.includes(locale)
}