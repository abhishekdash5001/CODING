import { useContext, type FC } from "react";

import { ThemeContext } from "../App";
interface IProps {}

export const ContextComponent: FC<IProps> = () => {
  const { changeTheme, theme } = useContext(ThemeContext);
  return (
    <div className="wrapper">
      <span>Context</span>
      <div>
        {theme}
        <button onClick={changeTheme}>Toogle</button>
      </div>
    </div>
  );
};
