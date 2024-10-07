import { alpha, Chip } from "@mui/material";
import React, { FC } from "react";
interface chipTypes {
  status: boolean;
  label?: string;
}
const CustomChip: FC<chipTypes> = ({ status, label }) => {
  return (

    <Chip     
    label={label ? label : status ? "Active" : "In Active"}
    
    sx={{
      bgcolor: status ? "#E9FCD4" : alpha("#D74242", 0.16),
      color: status ? "#2ea105" : "#b80202",
      fontWeight: 800,
      fontSize: "0.8rem",
      
      borderRadius: 1,
    }}
    />
  );
};

export default CustomChip;
