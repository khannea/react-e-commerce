import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#74B3CE",
    },
    secondary: {
      main: "#09BC8A",
    },
    third: {
      main: "#ffbf0e",
    },
  },
});

export default theme;
