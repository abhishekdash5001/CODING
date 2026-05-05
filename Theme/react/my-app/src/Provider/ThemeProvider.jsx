import { createContext, useLayoutEffect, useState } from "react";



function getSystemTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}


function getStoredTheme(){
  const theme = localStorage.getItem("theme");

  if(theme==='dark' || theme === 'light' || theme ==='system'){
    return theme
  }

  
  return 'system'
}


function resolveTheme(theme) {
  if (theme === "system") {
    return getSystemTheme();
  }

  return theme;
}

export const ThemeContext = createContext(null);




function applyTheme(theme) {
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(theme);
 
}

function ThemeProvider({children}) {
  const [theme, setTheme] = useState(() => getStoredTheme()); //lazy initilaizer

  const resolvedTheme = resolveTheme(theme);

  const changeTheme = (theme) => {
    localStorage.setItem("theme", theme);
    setTheme(theme)
    
  };


  useLayoutEffect(() => {
   
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);


  useLayoutEffect(()=>{
    if(theme !== 'system') return

    const m = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange =()=>{
     const  theme = m.matches? "dark" : "light";
     applyTheme(theme)
    }


    m.addEventListener('change',handleChange)


    return ()=>{
      m.removeEventListener('change',handleChange)
    }

  },[theme])



  return (
    <ThemeContext.Provider value={{ theme,resolveTheme, changeTheme }}>
     {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
