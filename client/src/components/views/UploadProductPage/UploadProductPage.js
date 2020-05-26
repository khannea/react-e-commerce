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

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState("");
  const [CountryValue, setCountryValue] = useState("France");
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

  const onCountrysSelectChange = (event) => {
    setCountryValue(event.currentTarget.value);
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
      !CountryValue
    ) {
      alert("First complete all fields!");
    } else {
      const variables = {
        writer: props.user.userData._id,
        title: TitleValue,
        description: DescriptionValue,
        price: PriceValue,
        images: Images,
        country: CountryValue,
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

  const countries = [
    {
      key: 1,
      value: "Allemagne",
    },
    {
      key: 2,
      value: "France",
    },
    {
      key: 3,
      value: "Espagne",
    },
    {
      key: 4,
      value: "Chine",
    },
    {
      key: 5,
      value: "Indonesie",
    },
    {
      key: 6,
      value: "Japon",
    },
    {
      key: 7,
      value: "Brésil",
    },
    {
      key: 8,
      value: "USA",
    },
    {
      key: 9,
      value: "Kenya",
    },
    {
      key: 10,
      value: "Canada",
    },
    {
      key: 11,
      value: "Finland",
    },
    {
      key: 12,
      value: "Madagascar",
    },
    {
      key: 13,
      value: "Iran",
    },
  ];

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
              label="Pays"
              defaultValue="France"
              onChange={onCountrysSelectChange}
              SelectProps={{
                native: true,
              }}
            >
              {countries.map((option) => (
                <option key={option.key} value={option.value}>
                  {option.value}
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
