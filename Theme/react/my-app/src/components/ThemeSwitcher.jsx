import React from "react";

import { useTheme } from "../Hooks/useTheme";


export default function ThemeSwitcher() {
  const { changeTheme} = useTheme()

  return <>
  <button onClick={()=>changeTheme('dark')}>Toggle to Dark</button>;
  <button onClick={()=>changeTheme('light')}>Toggle to Light</button>;
  <button onClick={()=>changeTheme('system')}>Toggle to Systme</button>;

  </>
}
