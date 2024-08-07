import {
  Box,
  Card,
  CardContent,
  FormLabel,
  Grid,
  Skeleton,
  Switch,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Crumbs from "src/configs/g_components/Crumbs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Customfield from "src/configs/g_components/Customfield";
import CustomButton from "src/configs/g_components/CustomButton";
import GModal from "src/configs/g_components/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addeditdata } from "src/reduxStore/editDataSlice";
import { useRouter } from "next/router";
import RoleoptionController from "src/pages/tile-options/controller";
import { errorToast, successToast } from "../g_toaster";
interface IFormInput {
  name: string;
  is_active: boolean;
}
interface editformdata {
  editdata: IFormInput;
}

const RoleOptionsForm = ({ open }: { open: any }) => {

  const roleoptionController = new RoleoptionController();
  const editdata = useSelector(
    (state: any) => state?.data?.alleditdata?.editdata
  );
  const schema = yup.object({
    name: yup.string().required("Role Option Name is required"),
    is_active: yup.bool().required("Status is Required"),
  });

  const initialValue: IFormInput = {
    name: editdata?.name || "",
    is_active: editdata ? editdata?.is_active : true,
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
    mutate(data);
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      editdata
        ? roleoptionController.editRoleOptionList({ payload: data, id: editdata?._id }) : roleoptionController.addRoleOptionList({ payload: data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["RoleOptionList"] });
      successToast({ title: `Role Options ${editdata ? "Edited" : "Added"} Successfully` });
      dispatch(addeditdata(null));
      open(false);
    },
  });
  const isInitialized = false;

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Customfield
                    fullWidth={true}
                    initialize={isInitialized}
                    placeholder="Role Option Name"
                    labelName="Role Option Name"
                    size={"small"}
                    register={register("name")}
                    helperText={errors.name?.message}
                    error={!!errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>

                  <FormLabel>Status</FormLabel>
                  <Switch
                    defaultChecked={initialValue?.is_active}
                    {...register("is_active")}
                  />

                </Grid>
                <Grid item sm={6} textAlign={"right"}>
                  <CustomButton
                    initialize={isInitialized}
                    variant="contained"
                    type="submit"
                    sx={{ width: 150, float: "right" }}
                    isLoading={isPending}
                    label={editdata ? "Update" : "Submit"}
                  />
                </Grid>
              </Grid>
            </form>
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default RoleOptionsForm;
