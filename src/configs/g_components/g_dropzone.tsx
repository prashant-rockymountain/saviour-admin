import {
  AttachFile,
  Attachment,
  Cancel,
  Delete,
  UploadFile,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, Fragment, useState } from "react";
import Dropzone from "react-dropzone";
import { ApiUrl } from "src/configs/api/apiUrls";
import Customfield from "./Customfield";
import CustomButton from "./CustomButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axi from "../api/AxiosInterseptor";
import { ApiStatus } from "../g_constants/allConstants";
import { errorToast, successToast } from "./g_toaster";
import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";
import CustomZoneLoader from "./CustomZoneLoader";

interface imageDropZone {
  doc: Array<string> | string;
  disbale?: boolean;
  label: string;
  multiple?: boolean;
  isLoading: boolean;
  setValue: any;
  registerName: string;
  editapiul: string | undefined;
  querykey: string;
  id?: string;
}

const Gdropzone: FC<imageDropZone> = ({
  doc,
  disbale = false,
  label,
  multiple = false,
  isLoading,
  setValue,
  registerName,
  editapiul,
  querykey,
  id = "",
}) => {
  const [btnloader, setbtnloader] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const getallfiles = (data: Array<string> | string) => {
    if (multiple && Array.isArray(data)) {
      return data.map((file: any, imgIndex: number) => (
        <Fragment key={imgIndex}>
          <img
            style={{ width: "100%", height: "230px", objectFit: "cover" }}
            src={
              file.slice(file.length - 3) == "pdf"
                ? "/images/pdf.png"
                : file.slice(file.length - 3) === "doc"
                  ? "/images/document.avif"
                  : `${ApiUrl.IMAGE_BASE_URL}${file}`
            }
          />
          <span
            onClick={(e) =>
              deletegoogleimage({ path: file, event: e, imgIndex })
            }
            style={{
              cursor: "pointer",
              color: "gray",
              position: "relative",
              left: -46,
              top: 10,
              height: "30px",
              padding: 3,
            }}
          >
            <Delete />
          </span>
        </Fragment>
      ));
    } else {
      return (
        <Fragment>
          <img
            style={{ width: "100%", height: "230px", objectFit: "contain" }}
            src={
              data.slice(data.length - 3) == "pdf"
                ? "/images/pdf.png"
                : data.slice(data.length - 3) === "doc"
                  ? "/images/document.avif"
                  : `${ApiUrl.IMAGE_BASE_URL}${data}`
            }
          />
          <span
            onClick={(e) =>
              deletegoogleimage({ path: data as string, event: e })
            }
            style={{
              cursor: "pointer",
              color: "gray",
              position: "relative",
              left: -46,
              top: 10,
              height: "30px",
              padding: 3,
            }}
          >
            <Delete />
          </span>
        </Fragment>
      );
    }
  };

  const Uploadimage = async (data: Array<any>) => {
    setbtnloader(true);
    let formdata = new FormData();
    data.forEach((element) => {
      formdata.append("image", element);
    });
    let result = await axi.post(ApiUrl.UPLOAD_IMAGE_URL, formdata);
    return result?.data?.data;
  };

  const deletegoogleimage = async ({
    path,
    event,
    imgIndex,
  }: {
    path: string;
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>;
    imgIndex?: number;
  }) => {
    event.stopPropagation();
    let newdata: Array<any> | any = JSON.parse(JSON.stringify(doc));
    if (!!editapiul) {
      if (multiple) {
        newdata.splice(imgIndex as number, 1);
      } else {
        newdata = "";
      }
      let result = await axi.put(
        `${editapiul}?url=${path}&key=${registerName}`,
        { image_data: newdata, _id: id }
      );
      if (result.status === ApiStatus.STATUS_200) {
        dispatch(addeditdata(result?.data?.data));
        setValue(registerName, newdata);
        queryClient.invalidateQueries({ queryKey: [querykey] });
      } else {
        errorToast({ title: result?.data?.message });
      }
    } else {
      let result = await axi.delete(ApiUrl.DELETE_GOOGLE_IMAGE_URL + path);
      if (result.status === ApiStatus.STATUS_200) {
        if (multiple) {
          newdata.splice(imgIndex as number, 1);
          setValue(registerName, newdata);
        } else {
          setValue(registerName, "");
        }
      }
    }
  };

  const { mutate } = useMutation({
    mutationFn: (data: Array<any>) => Uploadimage(data),
    onSuccess: (response) => {
      if (multiple) {
        setValue(registerName, [...doc, ...response]);
      } else {
        setValue(registerName, response[0]);
      }
      setbtnloader(false);
    },
  });

  return (
    <>
      <Dropzone
        multiple={multiple}
        disabled={disbale || btnloader}
        onDrop={(acceptedFiles) => mutate(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <Box
            {...getRootProps({
              className: `dropzone linkScroll scroll4`,
              onDrop: (event) => event.stopPropagation(),
            })}
          >
            <input {...getInputProps()} />

            <CustomButton
              fullwidth={multiple}
              initialize={isLoading}
              label={label}
              loadingbtn={false}
              attachment={true}
              iconCompoent={<Attachment />}
            />
            <Grid container spacing={6} sx={{ py: 3 }}>
              <Grid item xs={12}>
                {isLoading ? (
                <CustomZoneLoader/>
                ) : (
                  <>
                    {doc.length > 0 ? (
                      <Box className="perfectscroll">
                        {btnloader ? <CircularProgress /> : <>{getallfiles(doc)}</>}
                      </Box>
                    ) : (
                      <Box className="withoutscroll">
                        {btnloader ? (
                          <CircularProgress />
                        ) : (
                          <>
                            <Typography variant="body2" pb={1}>
                              No File Choosen
                            </Typography>
                            <img
                              style={{
                                width: "100%",
                                height: "230px",
                                objectPosition: "center",
                                objectFit: "contain",
                              }}
                              src="/images/defaultimage.jpg"
                            />
                          </>
                        )}
                      </Box>
                    )}
                  </>
                )}


              </Grid>
            </Grid>
          </Box>
        )}
      </Dropzone>
    </>
  );
};

export default Gdropzone;
