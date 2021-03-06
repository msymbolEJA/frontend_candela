import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 200,
    marginLeft: 10,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 5,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase({ globalSearch }) {
  const classes = useStyles();
  const [searchKey, setSearchKey] = useState("");

  const search = (event, searchKey) => {
    globalSearch(event, searchKey);
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ "aria-label": "search google maps" }}
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={(event) => search(event, searchKey)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
