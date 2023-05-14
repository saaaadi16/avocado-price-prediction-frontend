import { TextField as TextFieldMUI } from "@mui/material";

const TextField = ({ label, ...props }) => {
  return (
    <>
      <TextFieldMUI
        sx={{
          width: 300,
          // backgroundColor: "#ffffffcd",
          borderRadius: "5px",
        }}
        color="warning"
        {...props}
        label={label}
      />
    </>
  );
};

export default TextField;
