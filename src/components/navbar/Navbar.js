import React, { useState } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  NativeSelect,
  FormControl,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { AccountCircle, Menu as MenuIcon } from "@material-ui/icons";
import { postAuthData } from "../../helpers/DataTransitions";
import {
  toastSuccessNotify,
  toastErrorNotify,
} from "../../helpers/ToastNotify";

const STORE_NAME = process.env.REACT_APP_STORE_NAME;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${60}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#91c788",
    color: "black",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
  },
  hrefStyle: {
    textDecoration: "none",
    color: "#474747",
    fontWeight: "545",
  },
  rightTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    border: "2px solid #52734D",
    padding: 5,
    borderRadius: 3,
  },
  userRole: {
    fontSize: "0.8rem",
    color: "#52734D",
  },
  userName: {
    fontSize: "1.2rem",
    color: "#2D402A",
  },
  whiteColor: {
    color: "black",
  },
  hide: {
    display: "none",
  },
  langControl: {
    margin: 10,
  },
}));

export default function NavBar({ open, handleDrawerOpen }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open2 = Boolean(anchorEl);
  let history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccountPage = () => {
    history.push("/account");
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dashboarDirectFunc = () => {
    history.push("/");
  };

  const handleLogout = () => {
    history.push("/login");
    postAuthData(`${BASE_URL}auth/logout/`)
      .then((response) => {
        toastSuccessNotify(response.data.detail);
        localStorage.removeItem("x-auth-token");
        localStorage.removeItem("user");
      })
      .catch((error) => {
        console.log(error);
        toastErrorNotify(error);
      });
  };

  const localUser = JSON.parse(localStorage.getItem("user"));
  // console.log({ localUser });

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
          <span onClick={dashboarDirectFunc} style={{ cursor: "pointer" }}>
            {STORE_NAME}
          </span>
        </Typography>

        <div>
          <FormControl className={classes.langControl}>
            <NativeSelect
              //   value={lang}
              //   onChange={handleLangChange}
              className={classes.whiteColor}
              inputProps={{
                name: "age",
                id: "age-native-label-placeholder",
              }}
            >
              <option value="en" style={{ color: "black" }}>
                🇬🇧
              </option>
              <option value="tr" style={{ color: "black" }}>
                🇹🇷
              </option>
            </NativeSelect>
          </FormControl>
        </div>
        <div className={classes.rightTop}>
          <div className={classes.userInfo}>
            <div className={classes.userRole}>
              {localUser?.userRole?.toUpperCase()}
            </div>
            <div className={classes.userName}>{localUser?.username}</div>
          </div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            style={{ marginTop: "3.2rem" }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open2}
            onClose={handleClose}
          >
            <MenuItem onClick={handleAccountPage}>Account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
