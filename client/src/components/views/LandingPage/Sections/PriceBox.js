import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core/";
import { Typography, Button, Box } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Card, CardHeader, CardContent } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  deployed: {
    display: "inline-block",
  },
  hidden: {
    display: "none",
  },
  fullHeight: {
    height: "100%",
  },
  textButton: {
    justifyContent: "start",
  },
}));

export default function PriceBox(props) {
  const classes = useStyles();
  const [price, setPrice] = useState(["", ""]);
  const [hidden, sethidden] = useState(true);

  const handleChange = (event) => {
    let newPrice = [...price];
    if (event.target.id === "price-minimum") {
      newPrice[0] = event.target.value;
    } else {
      newPrice[1] = event.target.value;
    }
    setPrice(newPrice);
    props.handleFilters(newPrice);
  };

  const onClick = () => {
    if (hidden === true) {
      sethidden(false);
    } else {
      sethidden(true);
    }
  };

  return (
    <Card
      variant="outlined"
      elevation={0}
      className={!hidden ? classes.fullHeight : ""}
    >
      <Box m={1}>
        <div>
          <Button onClick={onClick} className={classes.textButton} fullWidth>
            <Typography variant="h6">Price</Typography>
            <ExpandMoreIcon />
          </Button>
        </div>
      </Box>
      <Box className={hidden ? classes.hidden : classes.deployed}>
        <CardContent>
          <TextField
            id="price-minimum"
            label="Min"
            variant="outlined"
            size="small"
            style={{
              maxWidth: "100px",
              marginRight: "10px",
              marginBottom: "10px",
            }}
            onChange={handleChange}
          />
          <TextField
            id="price-maximum"
            label="Max"
            variant="outlined"
            size="small"
            style={{ maxWidth: "100px" }}
            onChange={handleChange}
          />
        </CardContent>
      </Box>
    </Card>
  );
}
