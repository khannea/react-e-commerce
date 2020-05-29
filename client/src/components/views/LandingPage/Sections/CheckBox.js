import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { Typography, Button } from "@material-ui/core";
import { Card, CardContent, Box } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

function CheckBox(props) {
  console.log("Landing");
  const classes = useStyles();
  const [Checked, setChecked] = useState([]);
  const [hidden, sethidden] = useState(true);

  const onChange = (event) => {
    let currentIndex = Checked.findIndex((item) => item === event.target.value);
    let newChecked = [...Checked];
    if (currentIndex === -1) {
      newChecked.push(event.target.value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.handleFilters(newChecked);
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
        <Button onClick={onClick} fullWidth className={classes.textButton}>
          <Typography variant="h6">Région</Typography>
          <ExpandMoreIcon />
        </Button>

        <FormGroup
          aria-label="position"
          row
          className={hidden ? classes.hidden : classes.deployed}
        >
          <CardContent>
            {props.list.map((item, index) => {
              return (
                <FormControlLabel
                  key={item}
                  value={item}
                  control={<Checkbox color="primary" />}
                  label={item}
                  onChange={onChange}
                />
              );
            })}
          </CardContent>
        </FormGroup>
      </Box>
    </Card>
  );
}

export default CheckBox;
