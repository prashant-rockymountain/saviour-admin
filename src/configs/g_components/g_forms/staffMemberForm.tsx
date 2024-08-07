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
  createFilterOptions,
  CircularProgress,
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
import { AllCountry } from "src/configs/g_constants/all_country_code";
import RoleController from "src/pages/role/controller";
import StaffController from "src/pages/staff-member/controller";
import { errorToast, successToast } from "../g_toaster";
import { ApiUrl } from "src/configs/api/apiUrls";
import dynamic from "next/dynamic";
import CustomZoneLoader from "../CustomZoneLoader";

const Gdropzone = dynamic(() => import("../g_dropzone"), {
  ssr: false,
  loading: () => <CustomZoneLoader />,
});
interface IFormInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  profile_pic: string;
  is_active: boolean;
  role: string;
  country_code: string;
}
interface editformdata {
  editdata: IFormInput;
}

const schema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]*$/, "Name must contain letters only")
    .required("Name is required"),
  email: yup.string().email().required(),
  phone: yup.string().length(10).required("Must be 10 Digit"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  profile_pic: yup.string(),
  is_active: yup.bool(),
  role: yup.string().required("Role Is Required"),
  country_code: yup.string().required("Country Code is Required"),
});

const StaffMemberForm: FC<editformdata> = () => {
  const roleController = new RoleController();
  const staffMemberController = new StaffController();
  const editdata = useSelector(
    (state: any) => state?.data?.alleditdata?.editdata
  );

  function findCountryObject(): any {
    let find = AllCountry?.find((data: any, index: number) => {
      return data?.dial_code == editdata?.country_code;
    });
    return find;
  }

  const [countryCode, setCountryCode] = useState<any>(
    editdata ? findCountryObject() : null
  );

  const { data, isLoading } = useQuery({
    queryKey: ["Role"],
    queryFn: () => roleController.getRole(),
  });

  let roleOptions = data?.data?.data;
  const [selectedNames, setSelectedNames] = useState<any>(editdata?.role);

  const initialValue: IFormInput = {
    name: editdata?.name || "",
    email: editdata?.email || "",
    phone: editdata?.phone || "",
    password: (editdata && "12345678") || "",
    profile_pic: editdata?.profile_pic || "",
    is_active: editdata ? editdata?.is_active : true,
    role: editdata?.role?._id || "",
    country_code: editdata?.country_code || "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...initialValue },
  });

  const values = getValues();
  const filterOptions = createFilterOptions({
    // @ts-ignore
    stringify: ({ name, dial_code }) => `${name} ${dial_code}`,
  });

  const onSubmit = (data: any) => {
    let obj = {
      ...data,
      role: selectedNames?._id,
      country_code: countryCode?.dial_code,
    };
    mutate(obj);
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      const { password, ...rest } = data;
      return editdata
        ? staffMemberController.editStaffMember({
            payload: rest,
            id: editdata?._id,
          })
        : staffMemberController.addStaffMember({ payload: data });
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["Staff-Member"],
        exact: true,
      });
      successToast({
        title: `Staff Members ${editdata ? "Edited" : "Added"} Successfully`,
      });
      router.push("/staff-member");

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
                    <Grid item xs={6}>
                      <Customfield
                        fullWidth={true}
                        initialize={isLoading}
                        placeholder="Name"
                        labelName="Name"
                        size={"small"}
                        register={register("name")}
                        helperText={errors.name?.message}
                        error={!!errors.name}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Customfield
                        disabled={editdata ? true : false}
                        fullWidth={true}
                        initialize={isLoading}
                        placeholder="Email"
                        labelName="Email"
                        size={"small"}
                        register={register("email")}
                        helperText={errors.email?.message}
                        error={!!errors.email}
                      />
                    </Grid>
                    <Grid item xs={12} md={2.5}>
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
                          <FormLabel>Select Country Code</FormLabel>

                          <Autocomplete
                            id="country-select-demo"
                            fullWidth
                            sx={{ mt: 2 }}
                            options={AllCountry}
                            disabled={editdata ? true : false}
                            autoHighlight
                            size="small"
                            {...register("country_code")}
                            value={countryCode}
                            onChange={(e: any, value) => {
                              setCountryCode(value);
                              setValue("country_code", value?.dial_code);
                            }}
                            isOptionEqualToValue={(option, value) => {
                              return option?.dial_code == value?.dial_code;
                            }}
                            filterOptions={filterOptions}
                            getOptionLabel={(option) => option?.dial_code}
                            renderOption={(props, option) => {
                              const { key, ...optionProps } = props;
                              return (
                                <Box
                                  key={option?.key}
                                  component="li"
                                  {...optionProps}
                                >
                                  {option.name} ({option.code}){" "}
                                  {option.dial_code}
                                </Box>
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                hiddenLabel
                                placeholder="Country Code"
                                helperText={errors.country_code?.message}
                                error={!!errors.country_code}
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: "new-password", // disable autocomplete and autofill
                                }}
                              />
                            )}
                          />
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} md={3.5}>
                      <Customfield
                        fullWidth={true}
                        initialize={isLoading}
                        placeholder="Phone Number"
                        labelName="Phone Number"
                        size={"small"}
                        disabled={editdata ? true : false}
                        register={register("phone")}
                        helperText={errors.phone?.message}
                        error={!!errors.phone}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Customfield
                        fullWidth={true}
                        initialize={isLoading}
                        placeholder="Password"
                        labelName="Password"
                        size={"small"}
                        register={register("password")}
                        type={editdata ? "password" : "text"}
                        disabled={editdata ? true : false}
                        helperText={errors.password?.message}
                        error={!!errors.password}
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
                          <FormLabel>Select Role</FormLabel>
                          <Autocomplete
                            sx={{ mt: 2 }}
                            {...register("role")}
                            size="small"
                            id="tags-outlined"
                            onChange={(event, value) => {
                              setSelectedNames(value),
                                setValue("role", value?._id);
                            }}
                            options={roleOptions}
                            value={selectedNames}
                            getOptionLabel={(option: any) => option?.name}
                            isOptionEqualToValue={(option, value) => {
                              return option?._id == value?._id;
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                helperText={errors.role?.message}
                                error={!!errors.role}
                                placeholder="Select Role"
                              />
                            )}
                          />
                          {/* <FormHelperText sx={{ color: "red" }}>{!!errors.role_options && errors.role_options?.message}</FormHelperText> */}
                        </Grid>
                      </>
                    )}
                    <Grid item sm={6} xs={12}>
                      <Gdropzone
                        doc={watch().profile_pic!}
                        isLoading={isLoading}
                        label="Image"
                        setValue={setValue}
                        querykey={"Staff-Member"}
                        editapiul={
                          editdata
                            ? `${ApiUrl.EDIT_STAFF_MEMBER_URL}${editdata?._id}`
                            : undefined
                        }
                        registerName={"profile_pic"}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={6}>
                        <Grid item xs={6} sm={6}>
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
                        <Grid item sm={6} xs={6} textAlign={"right"}>
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

export default StaffMemberForm;
