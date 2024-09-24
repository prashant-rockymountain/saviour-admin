import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import {
  alpha,
  Box,
  FormHelperText,
  FormLabel,
  Skeleton,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";
import axi from "../api/AxiosInterseptor";
import { ApiUrl } from "../api/apiUrls";

const GUpload = ({
  setValue,
  value,
  name,
  labelName,
  initialize,
  error,
}: {
  setValue: any;
  value: any;
  name: string;
  labelName: string;
  initialize: boolean;
  error: any;
}) => {
  const uploadImage = async (payload: any) => {
    let data;
    if (value.length > 0) {
      data = await axi.delete(ApiUrl.DELETE_GOOGLE_IMAGE_URL + payload);
    } else {
      let formdata = new FormData();
      formdata.append("image", payload);
      data = await axi.post(ApiUrl.UPLOAD_IMAGE_URL, formdata);
    }
    return data.data;
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      data.data == null ? setValue(name, "") : setValue(name, data.data[0]);
      inputRef.current!.value = "";
    },
  });
  const handleUpload = (e: any) => {
    console.log("if Enter", "aoidn");
    if (e.target.files.length > 0) {
      console.log("if Enter", "aoidn");
      mutate(e.target.files[0]);
    }
  };
  const handleClick = () => {
    if (value?.length > 0) {
      inputRef.current!.value = "";
      mutate(value);
    } else {
      // inputRef.current!.value = "";
      console.log("else Enter", "aoidn");
      inputRef.current && inputRef.current.click();
    }
  };
  return (
    <>
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => handleUpload(e)}
        style={{ display: "none" }}
      />
      {initialize ? (
        <Skeleton variant="text" width={140} height={30} />
      ) : (
        <FormLabel>{labelName}</FormLabel>
      )}
      {initialize ? (
        <Skeleton variant="text" width={"100%"} height={45} />
      ) : (
        <>
          <Box
            sx={{
              border: `1px solid ${!!error ? "red" : "#ccc"}`,
              height: "40px",
              borderRadius: "6px",
              position: "relative",
              p: 1,
              px: 3,
              mt: 3,
              display: "flex",
              gap: 2,
            }}
          >
            <LoadingButton
              loading={isPending}
              variant="contained"
              size="small"
              sx={{ bgcolor: alpha("#D74242", 0.16), color: "#D74242" }}
              onClick={handleClick}
            >
              {value ? <DeleteIcon /> : <CloudUploadIcon />}
            </LoadingButton>
            <Typography my={"auto"}>
              {value ? value.slice(6) : "No file choosen"}
            </Typography>
          </Box>
          <FormHelperText error={!!error}>
            {!!error && error.message}
          </FormHelperText>
        </>
      )}
    </>
  );
};

export default GUpload;
