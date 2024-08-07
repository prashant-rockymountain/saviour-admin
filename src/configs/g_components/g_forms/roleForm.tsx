import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import React, { FC, useState } from "react";
import * as yup from "yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  OutlinedInput,
  MenuItem,
  Select,
  Stack,
  Chip,
  Autocomplete,
  TextField,
  FormHelperText,
  colors,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  Button,
  Card,
  CardContent,
  Fab,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  Skeleton,
  Switch,
} from "@mui/material";
import Customfield from "../Customfield";
import CustomButton from "../CustomButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";
import RoleoptionController from "src/pages/tile-options/controller";
import RoleController from "src/pages/role/controller";
import { errorToast, successToast } from "../g_toaster";

interface IFormInput {
  name: string;
  is_active: boolean;
  role_options: Array<Record<string, any>>;
}
interface editformdata {
  editdata: IFormInput;
}
const names = [
  "Humaira Sims",
  "Santiago Solis",
  "Dawid Floyd",
  "Mateo Barlow",
  "Samia Navarro",
  "Kaden Fields",
  "Genevieve Watkins",
  "Mariah Hickman",
  "Rocco Richardson",
  "Harris Glenn",
];

const RoleForm = () => {
  const roleoptionController = new RoleoptionController();
  const roleController = new RoleController();
  const editdata = useSelector(
    (state: any) => state?.data?.alleditdata?.editdata
  );
  const { data, isSuccess, error, isFetching, isLoading } = useQuery({
    queryKey: ["RoleOptionList"],
    queryFn: roleoptionController.getRoleOptionList,
  });
  let roleOptions = data?.data?.data;

  const [selectedNames, setSelectedNames] = useState<any>(
    editdata ? editdata?.option : []
  );
  const schema = yup.object({
    name: yup.string().required("Role Name is required"),
    is_active: yup.bool().required("Status is Required"),
  });

  const initialValue: IFormInput = {
    name: editdata?.name || "",
    is_active: editdata ? editdata?.is_active : true,
    role_options: selectedNames,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...initialValue },
  });

  const onSubmit = (data: any) => {
    let obj = { ...data, option: selectedNames };
    mutate(obj);
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      editdata
        ? roleController.editRole({ payload: data, id: editdata?._id })
        : roleController.addRole({ payload: data }),
    onError: () => {
      errorToast({ title: "Error" });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Role"], exact: true });
      router.push("/role");
      successToast({
        title: `Role ${editdata ? "Edited" : "Added"} Successfully`,
      });
      dispatch(addeditdata(null));
    },
  });

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={6}>
                    <Grid item xs={12}>
                      <Customfield
                        fullWidth={true}
                        initialize={isLoading}
                        placeholder="Role Name"
                        labelName="Role Name"
                        size={"small"}
                        register={register("name")}
                        helperText={errors.name?.message}
                        error={!!errors.name}
                      />
                    </Grid>
                    {isLoading ? (
                      <Grid item xs={12}>
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={40}
                        />
                      </Grid>
                    ) : (
                      <>
                        <Grid item xs={12}>
                          <FormLabel>Select Role Options</FormLabel>
                          <Autocomplete
                            sx={{ mt: 2 }}
                            size="small"
                            multiple
                            id="tags-outlined"
                            onChange={(event, value) => {
                              setSelectedNames(value);
                            }}
                            disableCloseOnSelect
                            options={roleOptions}
                            value={selectedNames}
                            getOptionLabel={(option: any) => option?.name}
                            isOptionEqualToValue={(option, value) => {
                              return option._id == value._id;
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select Role Options"
                              />
                            )}
                          />
                          {/* <FormHelperText sx={{ color: "red" }}>{!!errors.role_options && errors.role_options?.message}</FormHelperText> */}
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12} sm={6}>
                      {isLoading ? (
                        <Skeleton
                          variant="rectangular"
                          width={150}
                          height={30}
                        />
                      ) : (
                        <>
                          <FormLabel>Status</FormLabel>
                          <Switch
                            defaultChecked={initialValue?.is_active}
                            {...register("is_active")}
                          />
                        </>
                      )}
                    </Grid>
                    <Grid item sm={6} textAlign={"right"}>
                      <CustomButton
                        initialize={isLoading}
                        variant="contained"
                        type="submit"
                        isLoading={isPending}
                        sx={{ width: 150, float: "right" }}
                        label={editdata ? "Update" : "Submit"}
                      />
                    </Grid>
                  </Grid>
                </form>
              </>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default RoleForm;
