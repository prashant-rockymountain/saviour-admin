import { alpha, Chip } from "@mui/material";
import React, { FC } from "react";
interface chipTypes {
  status: boolean;
  label?: string;
  fontsize?: Record<string,any>;
}
const CustomChip: FC<chipTypes> = ({ status, label, fontsize }) => {
  return (

    <Chip
      label={label ? label : status ? "Active" : "In Active"}
      sx={{
        bgcolor: status ? "#E9FCD4" : alpha("#D74242", 0.16),
        color: status ? "#2ea105" : "#b80202",
        fontWeight: 800,
        fontSize: fontsize ?? "0.7rem",

        borderRadius: 1,
      }}
    />
  );
};

export default CustomChip;
