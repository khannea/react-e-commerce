import React, { useState } from "react";
import {
  Container,
  Button,
  Typography,
  Grid,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
import continents from "../LandingPage/Sections/Data";

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState("");
  const [ContinentValue, setContinentValue] = useState("France");
  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const onContinentsSelectChange = (event) => {
    setContinentValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  //SUBMIT
  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !props.user.userData._id ||
      !TitleValue ||
      !DescriptionValue ||
      !PriceValue ||
      !Images ||
      !ContinentValue
    ) {
      alert("First complete all fields!");
    } else {
      const variables = {
        writer: props.user.userData._id,
        title: TitleValue,
        description: DescriptionValue,
        price: PriceValue,
        images: Images,
        continent: ContinentValue,
      };

      Axios.post("/api/product/uploadProduct", variables).then((response) => {
        if (response.data.success) {
          alert("Product successfullt uploaded");
        } else {
          alert("Failed to upload product");
        }
      });
    }
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography variant="h2">Upload product</Typography>
          </Grid>
          <Grid item>
            <FileUpload refreshFunction={updateImages} />
          </Grid>
          <Grid item>
            <TextField
              label="Titre"
              variant="outlined"
              fullWidth
              onChange={onTitleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              onChange={onDescriptionChange}
              multiline
              rows={2}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Price"
              onChange={onPriceChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              id="standard-select-currency-native"
              select
              label="Région"
              defaultValue="France"
              onChange={onContinentsSelectChange}
              SelectProps={{
                native: true,
              }}
            >
              {continents.map((continent) => (
                <option key={continent} value={continent}>
                  {continent}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onSubmit}
            >
              <Typography variant="h5">Submit</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default UploadProductPage;
