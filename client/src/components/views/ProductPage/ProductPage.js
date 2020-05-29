import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper } from "@material-ui/core";
import Axios from "axios";
import ImageSlider from "../../utils/ImageSlider";

function ProductPage(props) {
  let [product, setProduct] = useState(null);
  let id = props.match.params.id;

  useEffect(() => {
    getProduct({ id: id });
  }, []);

  const getProduct = (variables) => {
    Axios.post("/api/product/getProduct", variables).then((response) => {
      if (response.data.success) {
        setProduct(response.data.product[0]);
      } else {
        alert("Failed to get product informations");
      }
    });
  };

  return (
    <Box m={4}>
      {product && (
        <Grid
          container
          spacing={6}
          component={Paper}
          style={{ padding: "40px", height: "100%" }}
        >
          <Grid item md={6} xs={12}>
            <ImageSlider
              images={product.images}
              width="100%"
              showThumbs={true}
              //width="100%"
            />
          </Grid>

          <Grid container item spacing={5} md={6} xs={12} direction="column">
            <Grid
              container
              item
              spacing={2}
              style={{
                borderBottom: "2px solid #fff",
                boxShadow: "0 2px 0 #ffbf0e",
              }}
            >
              <Grid item>
                <Typography variant="h4">{product.title}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  <Box fontWeight={700}>{product.price}€</Box>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h6">{product.description}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h6">{product.description}</Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default ProductPage;
