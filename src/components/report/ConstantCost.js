import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { makeStyles } from "@material-ui/core/styles";
import { putData } from "../../helpers/DataTransitions";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles({
  shop: {
    textTransform: "capitalize",
    width: "150px",
  },
  inp: {
    width: 100,
    margin: 5,
  },
  header: {
    width: 110,
  },
  header2: {
    minWidth: "150px",
  },
  headerDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    border: "1px solid",
    borderRadius: "5px",
    padding: 5,
  },
  btn: {
    padding: 5,
    width: "100%",
    marginTop: 10,
  },
});

export const ConstantCost = () => {
  const classes = useStyles();
  const { response } = useFetch(`${BASE_URL}report/const/`, {});
  const [constantCosts, setConstantCosts] = useState([]);

  useEffect(() => {
    // console.log(response?.results);
    setConstantCosts(response?.results);
  }, [response]);

  const handleSave = (e) => {
    constantCosts?.forEach((item) => {
      putData(`${BASE_URL}report/const/${item?.shop}/`, item);
    });
  };

  const handleChange = (e, label, index) => {
    if (index === 0) {
      const newConst = { ...constantCosts[0], [label]: Number(e.target.value) };
      const newConstantCost = [newConst, constantCosts[1], constantCosts[2]];
      //   console.log(newConstantCost);
      setConstantCosts(newConstantCost);
    }
    if (index === 1) {
      const newConst = { ...constantCosts[1], [label]: Number(e.target.value) };
      const newConstantCost = [constantCosts[0], newConst, constantCosts[2]];
      //   console.log(newConstantCost);
      setConstantCosts(newConstantCost);
    }
    if (index === 2) {
      const newConst = { ...constantCosts[2], [label]: Number(e.target.value) };
      const newConstantCost = [constantCosts[0], constantCosts[1], newConst];
      //   console.log(newConstantCost);
      setConstantCosts(newConstantCost);
    }
  };

  return (
    <div className={classes.root}>
      <h2>Constant Cost</h2>
      <div className={classes.headerDiv}>
        <span className={classes.header2}>Shop</span>
        <span className={classes.header}>Commission</span>
        <span className={classes.header}>Other Expense (Daily)</span>
        <span className={classes.header}>Shipping Expense</span>
      </div>
      {constantCosts?.map((item, index) => (
        <div key={index} style={{ display: "flex" }}>
          <h4 className={classes.shop}>{item.shop}</h4>
          <input
            name={item?.shop}
            id={`commision-${item?.shop}`}
            className={classes.inp}
            type="text"
            value={item?.commision}
            onChange={(e) => handleChange(e, "commision", index)}
          />
          <input
            name={item?.shop}
            className={classes.inp}
            id={`daily_other_exp-${item?.shop}`}
            type="text"
            value={item?.daily_other_exp}
            onChange={(e) => handleChange(e, "daily_other_exp", index)}
          />
          <input
            id={item?.shop}
            className={classes.inp}
            type="text"
            name={`shipping_exp-${item?.shop}`}
            onChange={(e) => handleChange(e, "shipping_exp", index)}
            value={item?.shipping_exp}
          />
        </div>
      ))}
      <button className={classes.btn} onClick={handleSave}>
        Save
      </button>
    </div>
  );
};
