import { Geist, Geist_Mono } from "next/font/google";

import ThemeProviderCookies from "./theme/ThemeProviderCookies";
import "./globals.css";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Theme Demo",
  description: "Next.js theme switching demo",
};

async function getServerTheme() {
  const cookiesStore = await cookies();

  const theme = cookiesStore.get("theme")?.value;

  if (theme === "light" || theme === "dark" || theme==='system') {
    return theme;
  }

 

  return "light";
}


const themeScriptTwo=`
 function getSystemTheme(){
  return window.matchMedia("(prefers-color-scheme: dark)").matches ?'dark':'light'
  }
  debugger

  try {
    const a =  document.cookie.split(';').find((e)=>e.includes('theme'))
    const selectedTheme = a.split("=")[1]
    const resolvedTHeme = selectedTheme === 'system'?getSystemTheme():selectedTheme

    const container = document.documentElement
    container.classList.remove('light','dark')
    container.classList.add(resolvedTHeme)


  }catch(error){
    const container = document.documentElement
    container.classList.remove('light','dark')
   
    container.classList.add('light')
  }

`
const themeScript = `
(function(){// cant iffy like this as its server code need to convert this in string kinf xss
 try{
  const localTheme = localStorage.getItem('theme')
  const theme = localTheme === 'light'|| localTheme === 'dark'||localTheme === 'system'? localTheme:'system'

 
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ?'dark':'light'

  const resolvedTheme = theme === 'system'?systemTheme:theme
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolvedTheme);

 }
 catch(error){
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add('light');
 }
  
})()`;

export default async function RootLayout({ children }) {
  const theme = await getServerTheme();
  const initialResolvedTheme = theme === "system" ? "light" : theme;


 
 


  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${initialResolvedTheme}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScriptTwo }} />
      </head>
      <body>
        <ThemeProviderCookies initialValue={theme}>
          {children}
        </ThemeProviderCookies>
      </body>
    </html>
  );
}
