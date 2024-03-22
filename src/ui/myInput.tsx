import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box } from "@mui/material";
import { ErrorMessage } from "formik";

//de tam vi ch fix dc

export interface MyInputProps {
  id: string;
  field: {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  placeholder: string;
  error?: string;
  helperText?: string;
}

function MyInput({ field, placeholder, error, helperText }: MyInputProps) {
  return (
    <Box className="relative">
      <TextField
        {...field}
        id={field.name}
        label={placeholder}
        value={field.value || ""}
        onChange={field.onChange}
        fullWidth
        size="medium"
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
        }}
        helperText={helperText}
        error={!!error}
      />
      <ErrorMessage
        name={field.name}
        component="p"
        className="pt-2 text-sm text-red-500"
      />
    </Box>
  );
}

function MyInputPassword({
  field,
  placeholder,
  error,
  helperText,
}: MyInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box>
      <TextField
        {...field}
        id={field.name}
        type={showPassword ? "text" : "password"}
        label={placeholder}
        size="medium"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
        }}
        value={field.value || ""}
        onChange={field.onChange}
        helperText={helperText}
        error={!!error}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                style={{ color: "white" }}
                aria-label="toggle password visibility"
                onClick={toggleShowPassword}
                onMouseDown={(event) => event.preventDefault()}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <ErrorMessage
        name={field.name}
        component="p"
        className="pt-2 text-sm text-red-500"
      />
    </Box>
  );
}

export { MyInput, MyInputPassword };
