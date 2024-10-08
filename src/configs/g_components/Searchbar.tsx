import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const Searchbar = ({
  data,
  setFilteredData,
}: {
  data: Array<Record<string, any>> | undefined;
  setFilteredData: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
}) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (typeof data === "undefined") {
      return;
    }
    if (data.length === 0) {
      setFilteredData([]);
    }

    setFilteredData([
      ...data?.filter((item: Record<string, any>) =>
        (
          item.name ||
          item.program_type ||
          item?.university?.name?.name ||
          item?.first_name + item?.middle_name + item?.last_name
        )
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(value.replace(/\s+/g, "").toLowerCase())
      ),
    ]);
  }, [value, data]);

  return (
    <TextField
      size="small"
      value={value}
      fullWidth
      onChange={(e) => setValue(e.target.value)}
      label="Search"
      placeholder="Search"
    />
  );
};

export default Searchbar;
