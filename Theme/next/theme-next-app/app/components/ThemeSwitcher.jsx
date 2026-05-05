"use client"
import React ,{useState,useEffect}from "react";

import { useTheme } from "../theme/useTheme";


export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const {resolvedTheme, changeTheme,theme} = useTheme()

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>
  <p>Theme: {theme}</p>
  <p>Resolved Theme: {resolvedTheme}</p>
  
  <button onClick={()=>changeTheme('dark')}>Toggle to Dark</button>;
  <button onClick={()=>changeTheme('light')}>Toggle to Light</button>;
  <button onClick={()=>changeTheme('system')}>Toggle to Systme</button>;

  </>
}
