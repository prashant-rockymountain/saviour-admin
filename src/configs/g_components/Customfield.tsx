import { FormLabel, InputBaseComponentProps, Skeleton, TextField } from "@mui/material";
import React, { FC, ReactNode } from "react";
interface customfield {
  initialize: boolean;
  size: any;
  placeholder?: string;
  fullWidth: boolean;
  helperText?: ReactNode;
  error?: boolean;
  labelName: string;
  register?: Record<string, any>;
  disabled?: boolean,
  type?: React.HTMLInputTypeAttribute;
  variant?: "outlined" | "filled" | "standard";
}
const Customfield: FC<customfield> = ({
  initialize = false,
  size,
  placeholder,
  fullWidth = true,
  helperText,
  error,
  type,
  labelName,
  register,
  ...props
}) => {
  return (
    <>
      {initialize ? (
        <Skeleton variant="text" width={140} height={30} />
      ) : (
        <FormLabel>{labelName}</FormLabel>
      )}
      {initialize ? (
        <Skeleton variant="text" width={"100%"} height={45} />
      ) : (
        <TextField

          type={type || "text"}
          sx={{ mt: 2 }}
          placeholder={placeholder}
          size={size}
          fullWidth={fullWidth}
          helperText={helperText}
          error={error}
          {...register}
          {...props}
        />
      )}
    </>
  );
};

export default Customfield;
