import React from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { AppBar, Grid } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";

function NavBar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <LeftMenu />
          </Grid>
          <Grid item>
            <RightMenu />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
