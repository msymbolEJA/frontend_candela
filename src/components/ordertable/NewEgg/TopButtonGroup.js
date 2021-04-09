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
    minWidth: 160,
  },
}));

const TopButtonGroup = ({ buttonTag, setButtonTag }) => {
  const classes = useStyles();

  const handleTagBtnClick = (event) => {
    setButtonTag(event.currentTarget.id);
  };

  return (
    <div className={classes.root}>
      <ButtonGroup
        color="primary"
        aria-label="outlined primary button group"
        size="small"
      >
        <Button className={classes.btnStyle} onClick={handleTagBtnClick} id="">
          All
        </Button>
        <Button className={classes.btnStyle} onClick={handleTagBtnClick} id="0">
          Unshipped
        </Button>
        <Button className={classes.btnStyle} onClick={handleTagBtnClick} id="1">
          Partially Shipped
        </Button>
        <Button className={classes.btnStyle} onClick={handleTagBtnClick} id="2">
          Shipped
        </Button>
        <Button className={classes.btnStyle} onClick={handleTagBtnClick} id="3">
          Invoiced
        </Button>
        <Button className={classes.btnStyle} onClick={handleTagBtnClick} id="4">
          Voided
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default TopButtonGroup;
