import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";
import { removeCartItem } from "../../../_actions/user_actions";
import { onSuccessBuy } from "../../../_actions/user_actions";
import { Box, Typography } from "@material-ui/core";
import UserCardBlock from "./Sections/UserCardBlock";
import Paypal from "../../utils/Paypal";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles({
  paypal_wrapper: { display: "inline" },
  paypal_hidden: { display: "none" },
});

const CartPage = (props) => {
  const classes = useStyles();
  let dispatch = useDispatch();
  const [Total, setTotal] = useState(0);
  const [ShowSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const cartItems = [];
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
          (response) => {
            if (response.payload.length > 0) {
              calculTotal(response.payload);
            } else {
              setTotal(0);
            }
          }
        );
      }
    }
  }, [props.user.userData]);

  const calculTotal = (products) => {
    let total = 0;

    products.map((product, index) => {
      total += product.quantity * product.price;
    });
    setTotal(total);
  };

  const transactionSuccess = (data) => {
    dispatch(
      onSuccessBuy({
        cartDetail: props.user.cartDetail,
        paymentData: data,
      })
    ).then((response) => {
      if (response.payload.success) {
        setShowSuccess(true);
        setTotal(0);
      }
    });
  };

  const transactionError = () => {
    console.log("Paypal error");
  };

  const transactionCanceled = () => {
    console.log("Paypal canceled");
  };

  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then((response) => {
      if (response.payload.cartDetail.length <= 0) {
        setTotal(0);
      }
    });
  };

  return (
    <Box width="80%" my={4} mx="auto">
      <Box my={2}>
        <Typography variant="h4">My Cart</Typography>
      </Box>
      {!ShowSuccess && (
        <UserCardBlock
          products={props.user.cartDetail}
          removeItem={removeFromCart}
          total={Total}
        />
      )}
      {ShowSuccess && (
        <Box my={2}>
          <CheckCircleIcon style={{ fill: "green", fontSize: 50 }} />
          <Typography variant="h5">Successfully purshase items</Typography>
        </Box>
      )}

      <Box
        my={4}
        className={Total === 0 ? classes.paypal_hidden : classes.paypal_wrapper}
      >
        <Paypal
          toPay={Total}
          onSuccess={transactionSuccess}
          transactionError={transactionError}
          transactionCanceled={transactionCanceled}
        />
      </Box>
    </Box>
  );
};

export default CartPage;
