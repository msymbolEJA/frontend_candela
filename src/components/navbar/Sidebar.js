import React, { Fragment, useState } from "react";
import clsx from "clsx";
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
    abr: "BB",
    link: "/orders/bb",
  },
  {
    id: 0,
    title: "Micro Center",
    icon: Dashboard,
    abr: "MC",
    link: "/orders/mc",
  },
  {
    id: 0,
    title: "Malabs",
    icon: Dashboard,
    abr: "ML",
    link: "/orders/mlab",
  },
  {
    id: 0,
    title: "Amazon",
    icon: Dashboard,
    abr: "AZ",
    link: "/orders/amz",
  },
  {
    id: 1,
    title: "New Egg",
    abr: "NE",
    icon: AssignmentTurnedIn,
    link: "/orders/ne",
  },
  {
    id: 2,
    title: "Walmart",
    abr: "WA",
    icon: Assignment,
    link: "/orders/wal",
  },
  {
    id: 3,
    title: "NewEgg Business",
    abr: "NB",
    icon: LocalLibrary,
    link: "/orders/neb",
  },
  {
    id: 4,
    title: "Return Orders",
    abr: "RO",
    icon: SupervisorAccount,
    link: "/orders/return-orders",
  },
  {
    id: 5,
    title: "Report",
    abr: "RP",
    icon: Assignment,
    link: "/report",
  },
  // {
  //   id: 11,
  //   title: "menu5",
  //   abr: "ME",
  //   icon: Assignment,
  //   link: "/student",

  //   subMenuLinks: [
  //     {
  //       id: 1,
  //       title: "completedExams",
  //       link: "/completed-exams",
  //     },
  //     {
  //       id: 2,
  //       title: "myExams",
  //       link: "/my-exams",
  //     },
  //     {
  //       id: 3,
  //       title: "purchaseExams",
  //       link: "/purchase-exams",
  //     },
  //   ],
  // },
  {
    id: 12,
    title: "Settings",
    abr: "SE",
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
  storeBadge: {
    border: "1px solid #2D402A",
    borderRadius: "5px",
    padding: "5px",
    width: "43px",
  },
}));

export default function SideBar({ user, open, handleDrawerClose, setOpen }) {
  const classes = useStyles();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const userRole = JSON.parse(localStorage.getItem("user"))?.userRole;
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
          {/* <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon> */}
          <ListItemIcon>
            <div className={classes.storeBadge}>{item.abr && item.abr}</div>
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
        {item?.subMenuLinks?.length &&
          isOpen &&
          item.subMenuLinks.map((el) => menuLinkComp(el))}
      </Fragment>
    );
  const handleNavigate = (link) => () => {
    handleDrawerClose();
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
