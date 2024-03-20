import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FormValues } from "../Models/Authentication";
import agent from "../utils/agent2";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik, Form, Field } from "formik";
import { MyInput, MyInputPassword } from "../ui/myInput";

export default function Login() {
  const navigation = useNavigate();

  const handleLoginSubmit = async (
    requestData: FormValues,
    navigate: NavigateFunction
  ) => {
    try {
      const response = await agent.Authentication.login(requestData);
      navigate("/EditMenu");
      console.log(response);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.error?.message;
        console.log(errorResponse);
        return errorResponse;
      }
    }
  };

  const handleSubmit = async (values: FormValues) => {
    handleLoginSubmit(values, navigation);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    // <>
    //         <Grid container component="main" sx={{ height: "100vh" }}>
    //     <CssBaseline />
    //     <Grid
    //       item
    //       xs={12}
    //       sm={8}
    //       md={4}
    //       component={Paper}
    //       elevation={6}
    //       square
    //       sx={{ bgcolor: "black" }}
    //     >
    //       <Box
    //         sx={{
    //           my: 8,
    //           mx: 9,
    //           display: "flex",
    //           flexDirection: "column",
    //           alignItems: "center",
    //           color: "white",
    //         }}
    //       >
    //         <EzentLogo />
    //         <Typography component="h1" variant="h3" sx={{ mt: 16 }}>
    //           Login
    //         </Typography>
    //         {/* <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}> */}
    //         <Box component="form" sx={{ mt: 1 }}>
    //           <input
    //             className="items-center bg-[#06070d] px-10 pt-0.5"
    //             placeholder="Enter your email"
    //             style={{ paddingLeft: "2.3rem", fontSize: "15px" }}
    //             type="email"
    //             name="email"
    //             value={userData.email}
    //             autoComplete="off"
    //             onChange={handleInputChange}
    //           />
    //           <input
    //             className="items-center bg-[#06070d] px-10 pt-0.5 mt-2"
    //             placeholder="Enter your password"
    //             style={{ paddingLeft: "2.3rem", fontSize: "15px" }}
    //             type="password"
    //             name="password"
    //             value={userData.password}
    //             autoComplete="off"
    //             onChange={handleInputChange}
    //           />

    //           <Grid container justifyContent="flex-end">
    //             <Link href="#" variant="body2" underline="none" color="white">
    //               {"Don't have an account yet? Sign up here"}
    //             </Link>
    //           </Grid>

    //           <Button
    //             type="submit"
    //             fullWidth
    //             variant="contained"
    //             sx={{ mt: 3, mb: 2 }}
    //             onClick={test}
    //           >
    //             Login
    //             <KeyboardArrowRightIcon />
    //           </Button>

    //           <Grid sx={{ mt: 15 }}>
    //             Lorem ipsum dolor sit amet consectetur adipisicing elit.
    //             Laboriosam iure nihil porro, illo nostrum repudiandae quasi enim
    //             quisquam molestiae reiciendis placeat est adipisci ratione
    //             commodi necessitatibus consectetur fugiat minima in.
    //           </Grid>

    //           {/* <Copyright sx={{ mt: 5 }} /> */}
    //         </Box>
    //       </Box>
    //     </Grid>

    //     <Grid
    //       item
    //       xs={false}
    //       sm={4}
    //       md={8}
    //       sx={{
    //         backgroundImage:
    //           "url(https://www.jalexanders.com/wp-content/uploads/2022/09/decorations.jpg)",
    //         backgroundRepeat: "no-repeat",
    //         backgroundColor: (t) =>
    //           t.palette.mode === "light"
    //             ? t.palette.grey[50]
    //             : t.palette.grey[900],
    //         backgroundSize: "cover",
    //         backgroundPosition: "center",
    //       }}
    //     />
    //   </Grid>
    // </>
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Box className="flex gap-4 p-8 w-full h-[400px] bg-white">
            <Field name="email" component={MyInput} placeholder="Email" />
            <Field
              name="password"
              component={MyInputPassword}
              placeholder="Password"
            />
            <Button type="submit" variant="contained">
              Sign in
            </Button>
          </Box>
        </Form>
      </Formik>
    </>
  );
}
