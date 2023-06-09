/**
 * Login pages
 * file: Login.jsx
 */
import React, { useState } from "react";
import { getAPIActionJSON } from "../../../../api/ApiActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, Grid, TextField } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import InputUser from "../../molecules/Input/InputUser";
import IconEyeOpen from "../../../assets/icons/IconEyes/IconEyeOpen";
import IconEyeClose from "../../../assets/icons/IconEyes/IconEyeClose";
import { connectStorageEmulator } from "firebase/storage";

//Style CSS
const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100% !important",
  height: "100vh",
  "& .card": {
    maxWidth: 1200,
    display: "grid",
    borderRadius: 30,
    alignItems: "center",
  },
  "& .grid": {
    maxHeight: 600,
    marginBottom: 2,
  },
}));
//Add color to button
const theme = createTheme({
  palette: {
    primary: {
      main: "#2A254B",
    },
  },
});
//Style CSS End

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const handleResponse = (response) => {
    console.log("RESPONSEEEE");
    console.log(response.message); // Check the value of the error message
    console.log(response.success); // Check the value of the error message

    if (!response.success) {
      toast.error(response.message);
      console.log(response.message);
      return;
    }
    navigate("/");
  };
  const handleLogin = async (values) => {
    console.log("DATAAAAA");
    console.log(values);
    dispatch(
      getAPIActionJSON(
        "login_shop",
        {
          email: values.email,
          password: values.password,
        },
        null,
        "",
        (e) => handleResponse(e)
      )
    );
  };
  const [togglePassword, setTogglePassword] = useState(false);
  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };
  return (
    <JWTRoot>
      <Card className="card">
        <div className="main-contain">
          <Grid container>
            <Grid item sm={6} xs={12}>
              <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
                <img src="../../../dreamer.svg" width="100%" alt="" />
              </JustifyBox>
            </Grid>

            <Grid item sm={6} xs={12}>
              <ContentBox>
                <JustifyBox p={4} height="45%" sx={{ minWidth: 320 }}>
                  <img src="../../../logo.svg" width="45%" alt="" />
                </JustifyBox>
                <Formik
                  onSubmit={handleLogin}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  {({ values, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <InputUser
                        type="email"
                        name="email"
                        id="email"
                        label="Email"
                        placeholder="Enter your gmail..."
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                      ></InputUser>
                      <InputUser
                        id="password"
                        name="password"
                        label="Password"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        type={togglePassword ? "text" : "password"}
                        icon={
                          togglePassword ? (
                            <IconEyeOpen
                              onClick={handleTogglePassword}
                            ></IconEyeOpen>
                          ) : (
                            <IconEyeClose
                              onClick={handleTogglePassword}
                            ></IconEyeClose>
                          )
                        }
                      />

                      <ThemeProvider theme={theme}>
                        <LoadingButton
                          type="submit"
                          color="primary"
                          variant="contained"
                          sx={{ my: 1, marginLeft: 30, width: 95, height: 35 }}
                        >
                          Login
                        </LoadingButton>
                      </ThemeProvider>
                    </form>
                  )}
                </Formik>
              </ContentBox>
            </Grid>
          </Grid>
        </div>
      </Card>
    </JWTRoot>
  );
};

export default Login;
