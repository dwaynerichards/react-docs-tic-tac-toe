//import { useState } from "react";
import Button from "@mui/material/Button";

const Square = (props) => {
  return (
    <Button variant="contained" className="square" onClick={props.onClick}>
      {props.value}
    </Button>
  );
};

export default Square;
