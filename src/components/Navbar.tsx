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
  Button,
  Grid,
  Tooltip,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const pages = ["Home", "Partners", "Event", "About"];

function Navbar() {
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

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Hàm mô phỏng việc đăng nhập thành công
  const simulateLogin = () => {
    setIsLoggedIn(true);
  };

  // Hàm mô phỏng việc đăng xuất
  const simulateLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "white",
        color: "black",
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
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, marginLeft: "80px" }}>
            <Grid container spacing={2} justifyContent="center">
              {pages.map((page) => (
                <Grid item key={page}>
                  <Button
                    variant="text"
                    onClick={handleCloseNavMenu}
                    sx={{
                      color: "black",
                    }}
                  >
                    {page}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                  <Link to="/Profile" className="px-3">
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography className="px-3">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Grid container spacing={2}>
                <Grid item>
                  <Link to="/Login" className="no-underline font-medium">
                    <Button
                      variant="text"
                      sx={{
                        color: "white",
                        backgroundColor: "black",
                        "&:hover": {
                          color: "white",
                          backgroundColor: "black",
                        },
                      }}
                    >
                      Sign In
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/SignUp" className="no-underline font-medium">
                    <Button
                      sx={{
                        color: "black",
                        "&:hover": {
                          color: "black",
                          backgroundColor: "#CDCDCD",
                        },
                      }}
                    >
                      Join Us
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
