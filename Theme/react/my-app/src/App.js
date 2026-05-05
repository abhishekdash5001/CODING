import { createContext, useLayoutEffect, useState } from "react";
import "./App.css";
import ThemeSwitcher from "./components/ThemeSwitcher";
import ThemeProvider from './Provider/ThemeProvider'







function App() {
  



  return (
    <ThemeProvider>
      <div className="App">
        <ThemeSwitcher />
      </div>
    </ThemeProvider>
  );
}

export default App;
