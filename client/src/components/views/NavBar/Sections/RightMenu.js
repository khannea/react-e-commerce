/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../_actions/user_actions";
import PublishIcon from "@material-ui/icons/Publish";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Badge from "@material-ui/core/Badge";

function RightMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.post(`${USER_SERVER}users/logout`).then((response) => {
      if (response.status === 200) {
        dispatch(logoutUser()).then((response) => {
          window.localStorage.setItem("userId", undefined);
          props.history.push("/login");
        });

        localStorage.clear();
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };
  return (
    <>
      {user.userData && user.userData.isAuth && (
        <>
          <Grid item container alignItems="center">
            <Grid item>
              <IconButton component={Link} to="/product/upload">
                <PublishIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <Button component={Link} to="/user/cart">
                <Badge
                  badgeContent={user.userData && user.userData.cart.length}
                  color="error"
                >
                  <ShoppingCartOutlinedIcon fontSize="large" />
                </Badge>
              </Button>
            </Grid>
            <Grid item>
              <Button component={Link} to="/history">
                <Typography variant="h5">History</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={logoutHandler}>
                <Typography variant="h5">Logout</Typography>
              </Button>
            </Grid>
          </Grid>
        </>
      )}

      {(!user.userData || !user.userData.isAuth) && (
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
              <Button component={Link} to="/login">
                <Typography variant="h5">Sign In</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button component={Link} to="/register">
                <Typography variant="h5">Sign Up</Typography>
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default withRouter(RightMenu);
