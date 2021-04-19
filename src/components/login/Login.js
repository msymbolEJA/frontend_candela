import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import candleSvg from "../../assets/candle.svg";
import { useHistory } from "react-router-dom";
import {
  toastSuccessNotify,
  toastErrorNotify,
} from "../../helpers/ToastNotify";
import { postAuthData } from "../../helpers/DataTransitions";
import { useFormik } from "formik";
import * as yup from "yup";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const validationSchema = yup.object({
  username: yup
    .string("Enter your username")
    .min(2, "Username should be of minimum 2 characters length.")
    .required("Username is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    "& .MuiPaper-root": {
      borderRadius: "10px",
      boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75);",
      height: "fit-content",
      marginTop: 40,
      maxWidth: "500px",
    },
    "& .MuiInputBase-root": {
      color: "#52734D",
    },
    "& label.Mui-focused": {
      color: "#52734D",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#52734D",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#52734D",
      },
      "&:hover fieldset": {
        borderColor: "#52734D",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#52734D",
      },
    },
  },
  image: {
    backgroundImage: "url(https://picsum.photos/1600/900)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    paddingTop: "40px",
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: "#DDFFBC",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#52734D",
    "&:hover": {
      backgroundColor: "#fad586",
      color: "#52734D",
    },
  },
  header: {
    color: "#52734D",
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      postAuthData(`${BASE_URL}auth/login/`, values)
        .then((response) => {
          toastSuccessNotify("Logged in successfully!");
          history.push("/");
        })
        .catch(({ response }) => {
          toastErrorNotify(response?.data?.non_field_errors[0]);
        });
    },
  });

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container justify="center" className={classes.image}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Grid className={classes.paper}>
            <Avatar className={classes.avatar}>
              <img src={candleSvg} style={{ width: 50 }} alt="candela" />
            </Avatar>
            <Typography className={classes.header} component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoFocus
                value={formik.values.username}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
