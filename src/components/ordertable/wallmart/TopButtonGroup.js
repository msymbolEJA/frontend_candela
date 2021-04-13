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
          id="Created"
          style={{
            backgroundColor: buttonTag === "Created" ? "#52734d" : null,
            color: buttonTag === "Created" ? "#fad586" : null,
          }}
        >
          Created
        </Button>
        <Button
          className={classes.btnStyle}
          variant="contained"
          onClick={handleTagBtnClick}
          id="Acknowledged"
          style={{
            backgroundColor: buttonTag === "Acknowledged" ? "#52734d" : null,
            color: buttonTag === "Acknowledged" ? "#fad586" : null,
          }}
        >
          Acknowledged
        </Button>
        <Button
          className={classes.btnStyle}
          variant="contained"
          onClick={handleTagBtnClick}
          id="Shipped"
          style={{
            backgroundColor: buttonTag === "Shipped" ? "#52734d" : null,
            color: buttonTag === "Shipped" ? "#fad586" : null,
          }}
        >
          Shipped
        </Button>
        <Button
          className={classes.btnStyle}
          variant="contained"
          onClick={handleTagBtnClick}
          id="Delivered"
          style={{
            backgroundColor: buttonTag === "Delivered" ? "#52734d" : null,
            color: buttonTag === "Delivered" ? "#fad586" : null,
          }}
        >
          Delivered
        </Button>
        <Button
          className={classes.btnStyle}
          variant="contained"
          onClick={handleTagBtnClick}
          id="Cancelled"
          style={{
            backgroundColor: buttonTag === "Cancelled" ? "#52734d" : null,
            color: buttonTag === "Cancelled" ? "#fad586" : null,
          }}
        >
          Cancelled
        </Button>
        <Button
          className={classes.btnStyle}
          variant="contained"
          onClick={handleTagBtnClick}
          id="Refund"
          style={{
            backgroundColor: buttonTag === "Refund" ? "#52734d" : null,
            color: buttonTag === "Refund" ? "#fad586" : null,
          }}
        >
          Refund
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default TopButtonGroup;
