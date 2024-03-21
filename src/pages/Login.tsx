import { Box, CssBaseline, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { FormValues } from "../Models/Authentication";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { MyInput, MyInputPassword } from "../ui/myInput";
import { useAuth } from "../hooks/useAuth";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LoginIcon from "./EzentLogo";
import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email cannot be empty'),
  password: Yup.string()
    .required('Password cannot be empty'),
});
export default function Login() {

  const initialValues = {
    email: '',
    password: '',
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
        <Grid item xs={5}>
          <Box
            sx={{
              my: 8,
              mx: 9,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "white",
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <LoginIcon />
            <Typography component="h1" variant="h3" sx={{ mt: 4 }}>
              Login
            </Typography>
            <Box className="w-full" >
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                  <Box className="p-8 w-full h-auto">
                    <Box>
                      <Field
                        name="email"
                        component={MyInput}
                        placeholder="Email" />
                    </Box>
                    <Box className="mt-5 mb-2">
                      <Field

                        name="password"
                        fullWidth
                        component={MyInputPassword}
                        placeholder="Password"
                      />
                    </Box>
                    <Grid container justifyContent="flex-end">

                      <Typography variant="body2" >
                        Don't have an account yet?
                        <Link to="/signup"
                          className="hover:text-yellow-700"
                        > Sign up here</Link>
                      </Typography>


                    </Grid>
                    <Button type="submit" sx={{
                      height: 45,
                      mt: 2,
                      mb: 1
                    }} fullWidth variant="contained" endIcon={<KeyboardArrowRightIcon />}>
                      {state.isFetching ? 'Processing...' : 'Login'}
                    </Button>
                    {state.error && <article className='text-red-500'>Invalid username or password, please check again</article>}
                    <Grid sx={{ mt: 4 }}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Laboriosam iure nihil porro, illo nostrum repudiandae quasi enim
                      quisquam molestiae reiciendis placeat est adipisci ratione
                      commodi necessitatibus consectetur fugiat minima in.
                    </Grid>
                  </Box>
                </Form>
              </Formik>

            </Box>
          </Box>

        </Grid>
        <Grid
          item
          xs={7}
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

      </Grid >

    </>
  );
}
