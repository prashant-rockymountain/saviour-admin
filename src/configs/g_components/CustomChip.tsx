import { alpha, Chip, Skeleton } from "@mui/material";
import React, { FC } from "react";
interface chipTypes {
  status: boolean;
}
const CustomChip: FC<chipTypes> = ({ status }) => {
  return (
    <Chip
      label={status === true ? "Active" : "In-active"}
      sx={{
        bgcolor: status === true ? "#E9FCD4" : alpha("#D74242", 0.16),
        color: status === true ? "#2ea105" : "#b80202",
        fontWeight: 800,
        borderRadius: 1,
      }}
    />
  );
};

export default CustomChip;
