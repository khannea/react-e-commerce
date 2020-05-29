import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Card, CardContent, CardActionArea } from "@material-ui/core";
import Axios from "axios";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import PriceBox from "./Sections/PriceBox";
import continents from "../LandingPage/Sections/Data";
import SearchBar from "./Sections/SearchBar";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  cardContainer: {
    justifyContent: "center",
  },
  productCard: {
    height: "380px",
  },
}));

function LandingPage() {
  const classes = useStyles();

  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const Limit = 6;
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({ continents: [], price: [] });
  const [SearchTerms, setSearchTerms] = useState("");

  const getProducts = (variables) => {
    Axios.post("/api/product/getProducts", variables).then((response) => {
      console.log(response);
      if (response.data.success) {
        if (variables.loadMore) {
          setProducts(Products.concat(response.data.products));
        } else {
          setProducts(response.data.products);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("Failed to get products informations");
      }
    });
  };

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(variables);
  }, []);

  const onLoadMore = () => {
    const variables = {
      skip: Skip + Limit,
      limit: Limit,
      loadMore: true,
      filters: Filters,
      searchTerm: SearchTerms,
    };
    getProducts(variables);
    setSkip(Skip + Limit);
  };

  const DisplayProducts = Products.map((product, index) => {
    return (
      <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
        <Card className={classes.productCard} style={{ height: "100%" }}>
          <ImageSlider images={product.images} showThumbs={false} />
          <CardActionArea
            style={{ height: "100%" }}
            value={index}
            component={Link}
            to={`/product/view/${product._id}`}
          >
            <CardContent style={{ height: "100%" }}>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Typography variant="h5">
                    <Box fontWeight={900}>{product.price}€</Box>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">{product.title}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  });

  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters,
      searchTerm: SearchTerms,
    };

    getProducts(variables);
    setSkip(0);
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  function updateSearchTerms(newSearchTerm) {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };
    getProducts(variables);
    setSkip(0);
    setSearchTerms(newSearchTerm);
  }

  return (
    <Box m={4} justifyItems="center">
      <Grid container direction="column" alignItems="center" spacing={4}>
        <Grid container item spacing={2} justify="space-between">
          <Grid item md={5} xs={6}>
            <CheckBox
              list={continents}
              handleFilters={(filters) => handleFilters(filters, "continent")}
            />
          </Grid>

          <Grid item md={3} xs={6}>
            <PriceBox
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <SearchBar refreshFunction={updateSearchTerms} />
          </Grid>
        </Grid>

        <Grid container item spacing={4} className={classes.cardContainer}>
          {DisplayProducts}
        </Grid>

        {PostSize >= Limit && (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={onLoadMore}
            >
              MORE
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default LandingPage;
