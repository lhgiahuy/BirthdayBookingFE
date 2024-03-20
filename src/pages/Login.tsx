import { Box, CssBaseline, Grid, IconButton, Link, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import EzentLogo from './EzentLogo';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from "react";
import { handleLoginSubmit } from "../redux/slice/loginSlice";
import { useAppDispatch } from '../redux/hook';



export default function Login() {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  console.log("email: ", userData.email);
  console.log("password: ", userData.password)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    // const errorMessage = getErrorMessage(name, value);
    // setErrors({ ...errors, [name]: errorMessage });

    // if (name === 'email') {
    //   setIsEmailValid(validateEmail(value));
    // } else if (name === 'password') {
    //   setIsPasswordValid(validatePassword(value));
    // }
  };

  const onHandleSubmit = async () => {
    const response = await dispatch(handleLoginSubmit(userData))
    console.log(response);
  }

  return (
    <>
      <ThemeProvider theme>
        <Grid container component="main" sx={{ height: '100vh' }} >
          <CssBaseline />
          <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square sx={{ bgcolor: 'black' }}>

            <Box
              sx={{
                my: 8,
                mx: 9,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'white'
              }}
            >
              <EzentLogo />
              <Typography component="h1" variant="h3" sx={{ mt: 16 }} >
                Login
              </Typography>
              {/* <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}> */}
              <form>
                <Box component="form" sx={{ mt: 1 }} >
                  <input
                    className="items-center bg-[#06070d] px-10 pt-0.5"
                    placeholder="Enter your email"
                    style={{ paddingLeft: '2.3rem', fontSize: '15px' }}
                    type="email"
                    name="email"
                    value={userData.email}
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                  <input
                    className="items-center bg-[#06070d] px-10 pt-0.5 mt-2"
                    placeholder="Enter your password"
                    style={{ paddingLeft: '2.3rem', fontSize: '15px' }}
                    type="password"
                    name="password"
                    value={userData.password}
                    autoComplete="off"
                    onChange={handleInputChange}
                  />


                  <Grid container justifyContent="flex-end">
                    <Link href="#" variant="body2" underline="none" color="white">
                      {"Don't have an account yet? Sign up here"}
                    </Link>
                  </Grid>


                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={onHandleSubmit}
                  >
                    Login
                    <KeyboardArrowRightIcon />
                  </Button>

                  <Grid sx={{ mt: 15 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam iure nihil porro, illo nostrum repudiandae quasi enim quisquam molestiae reiciendis placeat est adipisci ratione commodi necessitatibus consectetur fugiat minima in.</Grid>

                  {/* <Copyright sx={{ mt: 5 }} /> */}
                </Box>
              </form>
            </Box>
          </Grid>



          <Grid
            item
            xs={false}
            sm={4}
            md={8}
            sx={{
              backgroundImage: 'url(https://www.jalexanders.com/wp-content/uploads/2022/09/decorations.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

        </Grid>

      </ThemeProvider>

    </>
  );
}
