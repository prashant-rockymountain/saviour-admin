import { Avatar, styled } from "@mui/material";
import React, { FC } from "react";
import { ApiUrl } from "../api/apiUrls";
const ThumbImgStyle = styled("img")(({ theme }) => ({
  width: 50,
  height: 50,
  minWidth: 50,
  objectFit: "cover",
  background: theme.palette.background.default,
  marginRight: theme.spacing(2),
  border: "1px solid " + theme.palette.divider,
  borderRadius: 8,
}));
interface props {
  alt: string;
  src: string;
}
const CustomThumb: FC<props> = ({ alt, src }) => {
  return src.length > 0 ? (
    <ThumbImgStyle alt={alt} src={`${ApiUrl.IMAGE_BASE_URL}${src}`} />
  ) : (
    <Avatar
      sx={{
        borderRadius: "8px !important",
        height: 50,
        width: 50,
        minWidth: 50,
      }}
    >
      {alt.slice(0, 1)}
    </Avatar>
  );
};

export default CustomThumb;
