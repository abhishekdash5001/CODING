"use client";

import { createContext, useLayoutEffect, useState } from "react";

export const THEMES = {
  DARK: "dark",
  LIGHT: "light",
  SYSTEM: "system",
};

export const ThemeContext = createContext("");

function isValidTheme(theme) {
  return Object.values(THEMES).includes(theme);
}

function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light";
  }
  const mediaMatch = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return mediaMatch ? "dark" : "light";
}

function getTheme(theme) {
  if (isValidTheme(theme)) {
    return theme;
  }
  return "light";
}

function setThemeCookies(theme) {
  document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
}

export default function ThemeProviderCookies({ children, initialValue }) {
  const [theme, setMyTheme] = useState(() => getTheme(initialValue));
  const [systemTheme ,setSystemTheme]= useState(()=>getSystemTheme())

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  const changeTheme = (theme) => {
    if (!isValidTheme(theme)) {
      return;
    }
    setThemeCookies(theme);
    setMyTheme(theme);
  };

  useLayoutEffect(() => {
    const container = document.documentElement;
    container.classList.remove("light", "dark");

    container.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  useLayoutEffect(()=>{
    const w = window.matchMedia("(prefers-color-scheme: dark)")

  function  myFn(){
   
    const f = w.matches ?'dark':'light'
    setSystemTheme(f)
  }
  w.addEventListener('change',myFn)

  return ()=>{
    w.removeEventListener('change',myFn)
  }


  },[])

  return (
    <ThemeContext.Provider value={{ theme,resolvedTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
