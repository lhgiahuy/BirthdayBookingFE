import { Box, CssBaseline, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { FormValues } from "../Models/Authentication";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { MyInput, MyInputPassword } from "../ui/myInput";
import { useAuth } from "../hooks/useAuth";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LoginIcon from "./EzentLogo";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email cannot be empty"),
  password: Yup.string().required("Password cannot be empty"),
});
export default function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  const { state, handleLogin } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (values: FormValues) => {
    handleLogin(values, navigate);
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
              Login
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
                        Don't have an account yet?{" "}
                        <Link to="/signup" className="hover:text-blue-400">
                          Sign up here
                        </Link>
                      </Typography>
                    </Grid>
                    <Button
                      type="submit"
                      size="large"
                      fullWidth
                      variant="contained"
                      endIcon={<KeyboardArrowRightIcon />}
                    >
                      {state.isFetching ? "Processing..." : "Sign in"}
                    </Button>
                    {state.error && (
                      <article className="text-red-500">
                        Invalid username or password, please check again
                      </article>
                    )}
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
    </>
  );
}
