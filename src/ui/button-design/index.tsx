import { FC, ReactElement } from "react";
import { Button } from "@mui/material";
import styles from "./styles.module.css";

type Props = {
  onClick: ()=>{},
  children:ReactElement
}

export const ButtonDesign: FC<Props> = ({onClick,children}) => {
  return (
    <Button
      onClick={onClick}
      className={`${styles["button"]}`}
      sx={{
        margin:"8px 0px",
        padding:"0"
      }}
      disabled={false}
    >
      {children}
    </Button>
    );
};

