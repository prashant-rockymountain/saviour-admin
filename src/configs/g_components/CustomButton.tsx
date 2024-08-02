import { LoadingButton } from "@mui/lab";
import {
  Button,
  ButtonOwnProps,
  Skeleton,
  SxProps,
  Theme,
} from "@mui/material";
import React, { FC } from "react";
interface customfield {
  initialize: boolean;
  variant?: ButtonOwnProps["variant"];
  sx?: SxProps<Theme>;
  type?: "submit" | "reset" | "button" | undefined;
  label: string;
  fullwidth?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  attachment?: boolean
  iconCompoent?:any
  loadingbtn?:boolean
}
const CustomButton: FC<customfield> = ({
  initialize,
  variant = "contained",
  label,
  sx,
  iconCompoent,
  isLoading,
  fullwidth,
  attachment,
  loadingbtn = true,
  ...props
}) => {
  return (
    <>
      {initialize ? (
        <Skeleton variant="rectangular" sx={!!fullwidth ? { width: "100%" } : sx} height={40} />
      ) : (<>
        {loadingbtn ? <LoadingButton variant={variant} loading={isLoading} sx={sx} {...props}>
          {label}
        </LoadingButton> :
          <Button variant={variant} fullWidth={fullwidth || true} type="button" startIcon={attachment && iconCompoent}>
            {label}
          </Button>}
      </>)}
    </>
  );
};

export default CustomButton;
