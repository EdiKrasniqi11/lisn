import React, { ReactNode } from "react";
import style from "./Background.module.css";

interface ContainerProps {
  children: ReactNode;
  id?: string;
}

const Background: React.FC<ContainerProps> = ({ children, id }) => {
  return (
    <div className={style.backgroundDiv} id={id}>
      {children}
    </div>
  );
};

export default Background;
