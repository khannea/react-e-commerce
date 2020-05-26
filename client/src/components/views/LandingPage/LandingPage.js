import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Box } from "@material-ui/core";
import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import { CardActionArea, CardMedia } from "@material-ui/core";
import Axios from "axios";
import ImageSlider from "../../utils/ImageSlider";

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
  const [Limit, setLimit] = useState(6);
  const [PostSize, setPostSize] = useState(0);

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(variables);
  }, []);

  const getProducts = (variables) => {
    Axios.post("/api/product/getProducts", variables).then((response) => {
      if (response.data.success) {
        setProducts(Products.concat(response.data.products));
        setPostSize(response.data.postSize);
      } else {
        alert("Failed to get products informations");
      }
    });
  };

  const onLoadMore = () => {
    const variables = {
      skip: Skip + Limit,
      limit: Limit,
    };
    getProducts(variables);
    setSkip(Skip + Limit);
  };

  const DisplayProducts = Products.map((product, index) => {
    return (
      <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
        <Card className={classes.productCard}>
          {/* <CardHeader
              title={<Typography variant="h7">{product.title}</Typography>}
            /> */}
          <ImageSlider images={product.images} />
          <CardActionArea style={{ height: "100%" }}>
            <CardContent style={{ height: "100%" }}>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Typography variant="h5">
                    <Box fontWeight={900}>{product.price}€</Box>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">{product.country}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  });

  return (
    <Box m={4} justifyItems="center">
      <Grid container direction="column" alignItems="center" spacing={4}>
        <Grid container item spacing={4} className={classes.cardContainer}>
          {DisplayProducts}
        </Grid>
        {PostSize >= Limit && (
          <div>
            <Button variant="outlined" size="large" onClick={onLoadMore}>
              More
            </Button>
          </div>
        )}
      </Grid>
    </Box>
  );
}

export default LandingPage;
