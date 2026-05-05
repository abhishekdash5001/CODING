"use client";

import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { updateUserPreference, fetchUserPreference } from "./themeApi";

function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function getStoredTheme() {
  if (typeof window === "undefined") {
    return "system";
  }

  const theme = localStorage.getItem("theme");

  if (theme === "dark" || theme === "light" || theme === "system") {
    return theme;
  }

  return "system";
}

function resolveTheme(theme) {
  if (theme === "system") {
    return getSystemTheme();
  }

  return theme;
}

export const ThemeContext = createContext(null);

function applyTheme(theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => getStoredTheme()); //lazy initilaizer
  const [systemTheme, setSystemTheme] = useState(() => getSystemTheme());

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  const setThemeEveryWhere = (theme) => {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  const changeTheme = async (theme) => {
    setThemeEveryWhere(theme);

    try {
      await updateUserPreference(theme);
    } catch (err) {
      console.log("error");
    } finally {
    }
  };

  useLayoutEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  useLayoutEffect(() => {
    if (theme !== "system") return;

    const m = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const theme = m.matches ? "dark" : "light";
      setSystemTheme(theme)
     
    };

    m.addEventListener("change", handleChange);

    return () => {
      m.removeEventListener("change", handleChange);
    };
  }, [theme]);

  useEffect(() => {
    let ignore = false;

    async function syncThemeFromUserProfile() {

      
      try {
        let a = await fetchUserPreference();

        if(ignore){
            return 
        }

        setThemeEveryWhere(a);
      } catch (error) {
        console.log(error);
      }
    }
    syncThemeFromUserProfile();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
