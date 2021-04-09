import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  btnStyle: {
    color: "#52734d",
    borderColor: "#52734d",
    minWidth: 150,
  },
}));

const TopButtonGroup = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup
        color="primary"
        aria-label="outlined primary button group"
        size="small"
      >
        <Button className={classes.btnStyle}>Unshipped</Button>
        <Button className={classes.btnStyle}>Partially Shipped</Button>
        <Button className={classes.btnStyle}>Shipped</Button>
        <Button className={classes.btnStyle}>Invoiced</Button>
        <Button className={classes.btnStyle}>Voided</Button>
      </ButtonGroup>
    </div>
  );
};

export default TopButtonGroup;
