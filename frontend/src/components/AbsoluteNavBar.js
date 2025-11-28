import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
const pages = ["Home", "Search", "Groups", "Ratings", "New Releases"];
const settings = [
  { name: "Profile", icon: <AccountCircleIcon /> },
  { name: "Account", icon: <SettingsIcon /> },
  { name: "Logout", icon: <ExitToAppIcon /> },
];

function AbsoluteNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleLogOut = () => {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          navigate("/login");
        } else {
          alert("logout fialed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    console.log("the hell");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navcolor = "#ffa31a";
  const textcolor = "#000000";
  return (
    <AppBar position="static" sx={{ background: navcolor, color: textcolor }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Absolute Cinema
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={`/${page}`}>
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Absolute Cinema
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: textcolor, display: "block" }}
                component={Link}
                to={`/${page}`}
              >
                {page}
              </Button>
            ))}
          </Box>
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
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  {setting.name === "Logout" ? (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation(),
                          handleLogOut(),
                          console.log("beans");
                      }}
                      sx={{
                        width: "100%",
                        transform: "none",
                        padding: 0,
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        color: "inherit",
                      }}
                    >
                      {setting.icon}
                      <Typography sx={{ textAlign: "center" }}>
                        {setting.name}
                      </Typography>
                    </Button>
                  ) : (
                    <Button
                      component={Link}
                      to={`/${setting.name.toLowerCase()}`}
                      sx={{
                        width: "100%",
                        transform: "none",
                        padding: 0,
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        color: "inherit",
                      }}
                    >
                      {setting.icon}
                      <Typography sx={{ textAlign: "center" }}>
                        {setting.name}
                      </Typography>
                    </Button>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AbsoluteNavBar;
