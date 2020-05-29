import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Input,
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  input: {
    fontSize: "1.25rem",
  },
}));

function SearchBar(props) {
  let classes = useStyles();
  let [SearchTerms, setSearchTerms] = useState("");

  function onChangeSearch(event) {
    setSearchTerms(event.currentTarget.value);
    props.refreshFunction(event.currentTarget.value);
  }

  return (
    <TextField
      color="primary"
      variant="outlined"
      margin="none"
      style={{ height: "62px" }}
      size="medium"
      InputProps={{ style: { height: "100%" } }}
      label={
        <Typography
          variant="h6"
          style={{
            position: "relative",
            top: "-5px",
          }}
        >
          Rechercher...
        </Typography>
      }
      fullWidth
      onChange={onChangeSearch}
    />
  );
}

export default SearchBar;
