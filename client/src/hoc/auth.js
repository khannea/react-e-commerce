/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { auth } from "../_actions/user_actions";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      dispatch(auth())
        .then((response) => {
          if (response.payload.isAuth === true) {
            setRedirect(false);
            setLoading(false);
          } else {
            setRedirect(true);
            setLoading(false);

            const error = new Error(response.error);
            throw error;
          }
        })
        .catch((err) => {
          setRedirect(true);
          setLoading(false);
        });
    }, []);
    //    }, [setRedirect, setLoading]);

    if (option) {
      if (loading) {
        return null;
      }
      if (redirect === true) {
        return <Redirect to="/login" />;
      }
    }
    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
