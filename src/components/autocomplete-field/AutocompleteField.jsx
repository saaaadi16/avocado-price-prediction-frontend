// import * as React from "react";
import { TextField, Autocomplete } from "@mui/material";

const AutocompleteField = ({ label, options, value, handleChange }) => {
  return (
    <Autocomplete
      disablePortal
      value={value}
      onChange={handleChange}
      id="combo-box-demo"
      options={options}
      sx={{
        width: 300,
        // backgroundColor: "#ffffffcd",
        borderRadius: "5px",
      }}
      renderInput={(params) => (
        <TextField {...params} color="warning" label={label} />
      )}
    />
  );
};

export default AutocompleteField;
