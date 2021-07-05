import React, { Fragment, useState } from "react";
import clsx from "clsx";
// import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItemText,
  ListItemIcon,
  ListItem,
} from "@material-ui/core";
import {
  ChevronLeft as ChevronLeftIcon,
  Dashboard,
  LocalLibrary,
  SupervisorAccount,
  AssignmentTurnedIn,
  Assignment,
  Settings,
} from "@material-ui/icons";

const menuLinks = [
  {
    id: 0,
    title: "Best Buy",
    icon: Dashboard,
    link: "/orders/bb",
  },
  {
    id: 1,
    title: "New Egg",
    icon: AssignmentTurnedIn,
    link: "/orders/ne",
  },
  {
    id: 2,
    title: "Wallmart",
    icon: Assignment,
    link: "/orders/wal",
  },
  {
    id: 3,
    title: "NewEgg Business",
    icon: LocalLibrary,
    link: "/orders/neb",
  },
  {
    id: 4,
    title: "Return Orders",
    icon: SupervisorAccount,
    link: "/orders/return-orders",
  },
  {
    id: 5,
    title: "Report",
    icon: Assignment,
    link: "/report",
  },
  {
    id: 11,
    title: "menu5",
    icon: Assignment,
    link: "/student",

    subMenuLinks: [
      {
        id: 1,
        title: "completedExams",
        link: "/completed-exams",
      },
      {
        id: 2,
        title: "myExams",
        link: "/my-exams",
      },
      {
        id: 3,
        title: "purchaseExams",
        link: "/purchase-exams",
      },
    ],
  },
  {
    id: 12,
    title: "settings",
    icon: Settings,
    link: "/student",
  },
];

const drawerWidth = 225;

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: "#ddffbc",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    backgroundColor: "#ddffbc",
    width: 60,
    [theme.breakpoints.up("sm")]: {
      width: 60,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 70,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

export default function SideBar({ user, open, handleDrawerClose, setOpen }) {
  const classes = useStyles();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const userRole = JSON.parse(localStorage.getItem("user")).userRole;
  // console.log(userRole);

  const menuLinkComp = (item) =>
    userRole !== "admin" ? (
      item?.title !== "Report" ? (
        <Fragment key={item.id}>
          <ListItem
            button
            onClick={
              item?.subMenuLinks?.length
                ? handleShowSubMenu()
                : handleNavigate(item.link)
            }
          >
            <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
          {item?.subMenuLinks?.length &&
            isOpen &&
            item.subMenuLinks.map((el) => menuLinkComp(el))}
        </Fragment>
      ) : null
    ) : (
      <Fragment key={item.id}>
        <ListItem
          button
          onClick={
            item?.subMenuLinks?.length
              ? handleShowSubMenu()
              : handleNavigate(item.link)
          }
        >
          <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
        {item?.subMenuLinks?.length &&
          isOpen &&
          item.subMenuLinks.map((el) => menuLinkComp(el))}
      </Fragment>
    );
  const handleNavigate = (link) => () => {
    history.push(link);
  };
  const handleShowSubMenu = () => () => {
    setIsOpen(!isOpen);
  };
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      // onMouseEnter={() => setOpen(true)}
      // onMouseLeave={() => setOpen(false)}
    >
      <div className={classes.toolbar}>
        <IconButton
          onClick={handleDrawerClose}
          className={clsx({
            [classes.hide]: !open,
          })}
        >
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {menuLinks.map((item, index) => {
          return menuLinkComp(item);
        })}
      </List>
      <Divider />
    </Drawer>
  );
}
