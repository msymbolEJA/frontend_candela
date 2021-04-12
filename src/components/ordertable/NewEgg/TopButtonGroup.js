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
    backgroundColor: "#fad586",
    "&:hover": {
      color: "white",
      backgroundColor: "#52734d",
    },
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
        size="medium"
      >
        <Button
          className={classes.btnStyle}
          variant="contained"
          onClick={handleTagBtnClick}
          id=""
          style={{
            backgroundColor: buttonTag === "" ? "#52734d" : null,
            color: buttonTag === "" ? "#fad586" : null,
          }}
        >
          All
        </Button>
        <Button
          className={classes.btnStyle}
          variant="contained"
          onClick={handleTagBtnClick}
          id="0"
          style={{
            backgroundColor: buttonTag === "0" ? "#52734d" : null,
            color: buttonTag === "0" ? "#fad586" : null,
          }}
        >
          Unshipped
        </Button>
        <Button
          className={classes.btnStyle}
          variant="contained"
          onClick={handleTagBtnClick}
          id="1"
          style={{
            backgroundColor: buttonTag === "1" ? "#52734d" : null,
            color: buttonTag === "1" ? "#fad586" : null,
          }}
        >
          Partially Shipped
        </Button>
        <Button
          className={classes.btnStyle}
          variant="contained"
          onClick={handleTagBtnClick}
          id="2"
          style={{
            backgroundColor: buttonTag === "2" ? "#52734d" : null,
            color: buttonTag === "2" ? "#fad586" : null,
          }}
        >
          Shipped
        </Button>
        <Button
          className={classes.btnStyle}
          variant="contained"
          onClick={handleTagBtnClick}
          id="3"
          style={{
            backgroundColor: buttonTag === "3" ? "#52734d" : null,
            color: buttonTag === "3" ? "#fad586" : null,
          }}
        >
          Invoiced
        </Button>
        <Button
          className={classes.btnStyle}
          variant="contained"
          onClick={handleTagBtnClick}
          id="4"
          style={{
            backgroundColor: buttonTag === "4" ? "#52734d" : null,
            color: buttonTag === "4" ? "#fad586" : null,
          }}
        >
          Voided
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default TopButtonGroup;
