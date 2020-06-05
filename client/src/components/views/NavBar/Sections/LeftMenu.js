import React from "react";
import { Link } from "react-router-dom";
import { Typography, Grid, Button } from "@material-ui/core";

function LeftMenu(props) {
  return (
    <>
      <Grid
        item
        container
        alignContent="space-between"
        alignItems="center"
        direction="row"
        spacing={2}
      >
        <Grid item>
          <Button component={Link} to="/">
            <Typography variant="h5">Logo</Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default LeftMenu;
