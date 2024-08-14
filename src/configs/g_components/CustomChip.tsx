import { alpha, Chip, } from "@mui/material";
import React, { FC } from "react";
interface chipTypes {
  status: boolean;
  label: string;
}
const CustomChip: FC<chipTypes> = ({ status, label }) => {
  return (
    <Chip
      label={label}
      sx={{
        bgcolor: status === true ? "#E9FCD4" : alpha("#D74242", 0.16),
        color: status === true ? "#2ea105" : "#b80202",
        fontWeight: 800,
        fontSize: "0.7rem",

        borderRadius: 1,

      }}
    />
  );
};

export default CustomChip;
