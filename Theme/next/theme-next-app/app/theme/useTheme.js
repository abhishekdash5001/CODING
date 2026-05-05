'use client'

import React, { useContext } from "react";

import { ThemeContext } from "./ThemeProviderCookies";

export function useTheme(){
    const {theme, resolvedTheme,changeTheme} = useContext(ThemeContext);


  if (!theme) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }


    return {theme, resolvedTheme,changeTheme}
}