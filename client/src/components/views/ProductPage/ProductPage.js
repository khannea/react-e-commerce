import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Grid, Paper, Button } from "@material-ui/core";
import Axios from "axios";
import ImageSlider from "../../utils/ImageSlider";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { addToCart } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
  roundButton: {
    borderRadius: "5em",
    lineHeight: "0",
    padding: "20px 6px 5px 6px",
  },
  addCart: {
    position: "relative",
    top: "-5px",
  },
}));

function ProductPage(props) {
  let classes = useStyles();
  let [product, setProduct] = useState(null);
  let id = props.match.params.id;
  let dispatch = useDispatch();

  useEffect(() => {
    getProduct();
  }, []);

  const addToCardHandler = () => {
    dispatch(addToCart(id));
  };

  const getProduct = () => {
    Axios.get(`/api/product/products_by_id?id=${id}&type=single`).then(
      (response) => {
        setProduct(response.data[0]);
      }
    );
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
          <Grid item md={6} xs={12}>
            <Box flexDirection="column" height="100%" display="flex">
              <Box my={4}>
                <Grid
                  container
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
              </Box>

              <Box flexGrow={0.8}>
                <Typography variant="h6">{product.description}</Typography>
              </Box>

              <Box>
                <Grid container spacing={4}>
                  <Grid item>
                    <Typography variant="h6">
                      <Box fontWeight={700}>Vendu:{product.sold}</Box>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">
                      <Box fontWeight={700}>Vues:{product.views}</Box>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box mx="auto" my={2}>
                <Button
                  onClick={addToCardHandler}
                  color="secondary"
                  variant="contained"
                  size="large"
                  className={classes.roundButton}
                >
                  <Box
                    flexShrink={2}
                    justify="center"
                    className={classes.addCart}
                  >
                    <AddShoppingCartIcon
                      style={{
                        fontSize: "50px",
                      }}
                    />
                    <Typography variant="h6">Add</Typography>
                  </Box>
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default ProductPage;
