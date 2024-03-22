import {
  Box,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { MyInput, MyInputPassword } from "../ui/myInput";
import { useAuth } from "../hooks/useAuth";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import * as Yup from "yup";
import React, { useEffect } from "react";
import axios from "axios";
import { setPlace } from "../redux/slice/orderSlice";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email cannot be empty"),
  password: Yup.string().required("Password cannot be empty"),
  name: Yup.string().required("Name cannot be empty"),
});
export default function SignUp() {
  const [open, setOpen] = React.useState(true);
  const [role, setRole] = React.useState(0);
  interface FormValues {
    email: string;
    password: string;
    name: string;
  }
  const initialValues = {
    email: "",
    password: "",
    name: "",
  };

  const navigate = useNavigate();

  const handleSubmit = async (value: FormValues) => {
    const newAccount = {
      email: value.email,
      password: value.password,
      name: value.name,
      role,
    };
    try {
      const response = await axios.post(
        `https://swdbirthdaypartybooking.somee.com/api/auth/signup`,
        newAccount
      );
      console.log("Response:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Grid container sx={{ bgcolor: "black" }}>
        <CssBaseline />
        <Grid sx={{ display: "flex", justifyContent: "center" }} item xs={4}>
          <Box
            sx={{
              py: 8,
              px: 9,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "white",
              justifyContent: "center",
              maxHeight: "100vh",
              maxWidth: "500px",
            }}
          >
            <Typography variant="h3" fontWeight="bold" sx={{ mt: 4 }}>
              Sign up
            </Typography>
            <Box>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Box className="w-full flex flex-col gap-4 mt-8">
                    <Box>
                      <Box>
                        <Field
                          name="name"
                          component={MyInput}
                          placeholder="Name"
                        />
                      </Box>
                      <Box className="mt-5 mb-2">
                        <Field
                          name="email"
                          component={MyInput}
                          placeholder="Email"
                        />
                      </Box>
                      <Box className="mt-5 mb-2">
                        <Field
                          name="password"
                          fullWidth
                          component={MyInputPassword}
                          placeholder="Password"
                        />
                      </Box>
                    </Box>
                    <Grid container justifyContent="flex-end">
                      <Typography variant="body2">
                        Already have an account?{" "}
                        <Link to="/signin" className="hover:text-blue-400">
                          Sign in here
                        </Link>
                      </Typography>
                    </Grid>
                    <Button
                      type="submit"
                      size="large"
                      fullWidth
                      variant="contained"
                      endIcon={<KeyboardArrowRightIcon />}
                    ></Button>

                    <Grid sx={{ mt: 4 }}>
                      By joining, you agree to our Terms of Service and to
                      occasionally receive emails from us. Please read our
                      Privacy Policy to learn how we use your personal data.
                    </Grid>
                  </Box>
                </Form>
              </Formik>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={8}
          className="h-screen"
          sx={{
            backgroundImage:
              "url(https://www.jalexanders.com/wp-content/uploads/2022/09/decorations.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className="bg-black text-white">
          <Typography variant="h5" sx={{ padding: 2 }}>
            Select what you want to do
          </Typography>
          <Box className="px-4">
            <DialogContentText color="primary" id="alert-dialog-description">
              To provide the best experience in using the website, please select
              your role
            </DialogContentText>
          </Box>
          <Box className="flex gap-4 w-full p-4 justify-end">
            <Button
              variant="outlined"
              onClick={() => {
                setRole(1);
                setOpen(false);
              }}
            >
              Customer
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setRole(2);
                setOpen(false);
              }}
              autoFocus
            >
              Supplier
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
