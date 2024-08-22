import { alpha, Chip, Skeleton } from "@mui/material";
import React, { FC } from "react";
interface chipTypes {
  label: string;
  bgcolor: string;
  color: string;
  size:string| any;
}
const GChip: FC<chipTypes> = ({ label, bgcolor, color,size }) => {
  return (
    <Chip
    size={size}
      label={label}
      sx={{
        bgcolor: alpha(bgcolor, 0.16),
        color: color,
        fontWeight: 800,
        borderRadius: 1,
      }}
    />
  );
};

export default GChip;
