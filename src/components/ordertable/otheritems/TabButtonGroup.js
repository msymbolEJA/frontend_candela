import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
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
      color: "#fad586",
      backgroundColor: "#52734d",
    },
  },
}));

const TopButtonGroup = ({ buttonTag, handleTagBtnClick, orderStatusTags }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup color="primary" aria-label="outlined primary button group" size="medium">
        {orderStatusTags?.map((item, index) => (
          <Button
            className={classes.btnStyle}
            variant="contained"
            onClick={handleTagBtnClick}
            key={index}
            id={item.id}
            style={{
              backgroundColor: buttonTag === item?.id?.toString() ? "#52734d" : null,
              color: buttonTag === item?.id?.toString() ? "#fad586" : null,
            }}
            disabled={!!item?.disabled}
          >
            {item.status}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default TopButtonGroup;
