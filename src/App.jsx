import logo from "./assets/avocado.svg";
import "./App.css";
import { forwardRef, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import AutocompleteField from "./components/autocomplete-field/AutocompleteField";
import TextField from "./components/text-field/TextField";

function App() {
  const types = ["Conventional", "Organic"];
  const [type, setType] = useState(null);
  const [totalVolume, setTotalVolume] = useState("");
  const [smallVolume, setSmallVolume] = useState("");
  const [largeVolume, setLargeVolume] = useState("");
  const [xLargeVolume, setXLargeVolume] = useState("");
  const [totalBags, setTotalBags] = useState("");
  const [smallBags, setSmallBags] = useState("");
  const [largeBags, setLargeBags] = useState("");
  const [xLargeBags, setXLargeBags] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (_, value) => {
    setType(value);
  };

  const handleSubmit = async () => {
    // if (type === null) {
    //   alert("Please select type");
    //   return;
    // }

    if (totalVolume === "") {
      alert("Please enter total volume");
      return;
    }

    if (smallVolume === "") {
      alert("Please enter small volume");
      return;
    }

    if (largeVolume === "") {
      alert("Please enter large volume");
      return;
    }

    if (xLargeVolume === "") {
      alert("Please enter x-large volume");
      return;
    }

    if (totalBags === "") {
      alert("Please enter total bags");
      return;
    }

    if (smallBags === "") {
      alert("Please enter small bags");
      return;
    }

    if (largeBags === "") {
      alert("Please enter large bags");
      return;
    }

    if (xLargeBags === "") {
      alert("Please enter x-large bags");
      return;
    }

    const data = {
      // type,
      "Total Volume": totalVolume,
      4046: smallVolume,
      4225: largeVolume,
      4770: xLargeVolume,
      "Total Bags": totalBags,
      "Small Bags": smallBags,
      "Large Bags": largeBags,
      "XLarge Bags": xLargeBags,
    };

    try {
      setLoading(true);
      setOpen(true);
      setMessage("Sending Request...");
      setSeverity("success");

      const response = await axios.post(
        "https://avocado-price-prediction-model.herokuapp.com/predict-average-price",
        data
      );

      console.log(response.data);
      setPrediction(response.data.predicted_average_price);
      setOpenModal(true);
      setOpen(false);
    } catch (error) {
      setOpen(true);
      setMessage("Error Sending Request");
      setSeverity("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="App" mt={2}>
      {/* <header className="App-header"> */}
      <img src={logo} className="App-logo" alt="logo" />
      <Typography variant="h4" mt={5} mb={5}>
        Avocado Price Prediction
      </Typography>
      <Grid container display={"flex"} justifyContent={"center"} spacing={2}>
        <Grid item xs={4} display={"flex"} justifyContent={"center"}>
          <AutocompleteField
            label={"Type"}
            options={types}
            value={type}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label={"Total Volume"}
            type="number"
            value={totalVolume}
            onChange={(event) => {
              setTotalVolume(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label={"Avocado Small Volume"}
            type="number"
            value={smallVolume}
            onChange={(event) => {
              setSmallVolume(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label={"Avocado Large Volume"}
            type="number"
            value={largeVolume}
            onChange={(event) => {
              setLargeVolume(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label={"Avocado X-Large Volume"}
            type="number"
            value={xLargeVolume}
            onChange={(event) => {
              setXLargeVolume(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label={"Total Bags"}
            type="number"
            value={totalBags}
            onChange={(event) => {
              setTotalBags(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label={"Small Bags Volume"}
            type="number"
            value={smallBags}
            onChange={(event) => {
              setSmallBags(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label={"Large Bags Volume"}
            type="number"
            value={largeBags}
            onChange={(event) => {
              setLargeBags(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label={"X-Large Bags Volume"}
            type="number"
            value={xLargeBags}
            onChange={(event) => {
              setXLargeBags(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} mt={5}>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            variant="contained"
            sx={{
              backgroundColor: "#ef8829",
              color: "black",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#f1a258",
              },
            }}
          >
            {loading ? (
              <CircularProgress color="success" size={25} />
            ) : (
              "Predict Price"
            )}
          </Button>
        </Grid>
      </Grid>
      {/* </header> */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Average Price
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            fontWeight={"bold"}
          >
            $ {prediction}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default App;
