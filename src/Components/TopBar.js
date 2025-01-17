import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./TopBar.css";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import DiamondIcon from "@mui/icons-material/Diamond";
import MenuList from "./MenuList/MenuList";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

const drawerWidth = 240;
function DrawerAppBar(props) {
  const navigate = useNavigate();

  const ContactUs = () => {
    navigate("/ContactUs");
  };
  const HomePage = () => {
    navigate("/EcomStore");
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    backgroundColor: "#eeeeee",
    "&:hover": {
      backgroundColor: "#e3f2fd",
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
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "82ch",
        height: "35px",
      },
    },
  }));
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Grid container spacing={12}>
        <AppBar component="nav">
          <Toolbar>
            <DiamondIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              onClick={HomePage}
            />

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              style={{ display: "flex" }}
              onClick={HomePage}
            >
              MUI
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  color="error"
                  // component={Link}
                  to="/about"
                >
                  About Page
                </Button>
                <Button variant="outlined" color="error" onClick={ContactUs}>
                  Contact Us
                </Button>
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          />
        </Box>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <div className="main_body">
            <div className="sub_body">
              <h4 className="h4">Popular Tech Staff .</h4>
              <p className="p">High Quality Products With Custom Designs</p>
              <div className="search">
                <Search onChange={(e) => props.searchItems(e.target.value)}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </div>
              <div className="menu">
                <MenuList />
              </div>
            </div>
          </div>
        </Box>
      </Grid>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
