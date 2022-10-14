import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DiamondIcon from "@mui/icons-material/Diamond";
import { useNavigate } from "react-router-dom";
import "../TopBar.css";
import { IconButton, Paper, Skeleton } from "@mui/material";
import MenuList from "../MenuList/MenuList";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchBar from "./SearchBar";

function Copyright() {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <div>Social Links</div>
    </>
  );
}

const theme = createTheme();

export default function Album() {
  const [users, setUsers] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  const HomePage = () => {
    navigate("/EcomStore");
  };

  const fetchData = () => {
    fetch("https://6347aadd0484786c6e85792f.mockapi.io/CardContent")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setIsLoading(true);
      });
  };

  const searchItems = (searchValue) => {
    setSearchText(searchValue);
    if (searchText !== "") {
      const filteredData = users.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(users);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let newData = [];
  if (searchText.length > 0) {
    newData = filteredResults;
  } else {
    newData = users;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <DiamondIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            onClick={HomePage}
          />{" "}
          <Typography variant="h6" color="inherit" noWrap onClick={HomePage}>
            EcomStore layout
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}

        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Customised Botique Products
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              paragraph
              className="p"
            >
              High Quality Products With Custom Designs
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <SearchBar searchItems={searchItems} />
            </Stack>

            <MenuList />
          </Container>
        </Box>
        <Container sx={{ py: 0 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {newData.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                {!isLoading ? (
                  <Skeleton
                    variant="rounded"
                    width={230}
                    height={385}
                    sx={{ bgcolor: "grey.600", borderRadius: "10px" }}
                  />
                ) : (
                  <Paper
                    elevation={20}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "10px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="280"
                      sx={{ width: 220, marginLeft: "22px" }}
                      image={card.image}
                      alt="green iguana"
                      style={{
                        borderRadius: "15px",
                        paddingTop: "10px",
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button color="primary">
                        <IconButton
                          color="primary"
                          aria-label="add to shopping cart"
                        >
                          <AddShoppingCartIcon />
                        </IconButton>
                        View
                      </Button>
                    </CardActions>
                  </Paper>
                )}
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          © 2022 EcomStore. All rights reserved.
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}