import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Grid,
  Tooltip,
  Avatar,
  InputBase,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

const pages = ["Home", "Partners", "Event", "About"];

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigate();
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      setIsLoggedIn(true);
    }
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Hàm mô phỏng việc đăng xuất
  const handleLogout = async () => {
    await localStorage.clear();
    navigation("/login");
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    border: "1px solid",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "black",
        color: "white",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/">Logo</Link>
            <Box
              sx={{ display: { xs: "none", md: "flex" }, marginLeft: "80px" }}
            >
              <Grid container spacing={2} justifyContent="center">
                {pages.map((page) => (
                  <Grid item key={page}>
                    <Link className="hover:text-red-600" to="/">
                      {page}
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
          <Box className="flex items-center gap-4">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            {isLoggedIn ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Avatar"
                      src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-1/269922981_3016543585235258_3132946373432292991_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHyXr4F3Z-7d9fd9FodVyaH3eIc7-Lebuvd4hzv4t5u69TRSbqyc-nQJ4FCTPnEYsdvHCrH_NfhmndMvvTwTLm5&_nc_ohc=hibNpN-JsJgAX_ZRGqG&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfAUMDS01ew0CeKkFvsV9LTw3w3q1mEaBP0lyw7h0aHHog&oe=660146D6"
                      sx={{ width: "2rem", height: "2rem" }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button
                      color="secondary"
                      onClick={() => {
                        navigation("/Editprofile");
                        window.scrollTo(0, 0); // Scroll to top of the page
                      }}
                    >
                      Profile
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button
                      color="secondary"
                      onClick={() => {
                        navigation("/OrderHistory");
                        window.scrollTo(0, 0); // Scroll to top of the page
                      }}
                    >
                      Order History
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button color="secondary" onClick={handleLogout}>
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Link
                  to="/login"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Sign in
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
