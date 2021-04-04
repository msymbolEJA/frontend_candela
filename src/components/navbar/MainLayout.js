import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SideBar from "./Sidebar";
import Navbar from "./Navbar";
import { AppContext } from "../../context/Context";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MainLayout({ children }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { isSideBarOpen, setSideBarOpen } = useContext(AppContext);

  const handleDrawerOpen = () => {
    setSideBarOpen(true);
  };

  const handleSideBarMouseOver = (bool) => {
    setOpen(isSideBarOpen || bool);
  };

  const handleDrawerClose = () => {
    setSideBarOpen(false);
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Navbar
        open={isSideBarOpen || open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <SideBar
        open={isSideBarOpen || open}
        setOpen={handleSideBarMouseOver}
        handleDrawerClose={handleDrawerClose}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
