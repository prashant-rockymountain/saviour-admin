import {
  Box,
  Checkbox,
  ClickAwayListener,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useQuery } from "@tanstack/react-query";
import CourseFinderController from "src/pages/course-finder/controller";
const courseFinderController = new CourseFinderController();

const names = [
  {
    id: "66b4af95c5c557792903ecc8",
    name: "arts",
    is_open: true,
    is_active: true,
    category: [
      {
        _id: "66c71dcf02626de7a4608e46",
        name: "global studies",
        is_active: true,
        createdAt: "2024-08-22T11:15:27.747Z",
        updatedAt: "2024-10-01T06:53:50.188Z",
        __v: 0,
      },
      {
        _id: "66b5a8054963d3990f9994b0",
        name: "english literature",
        is_active: true,
        createdAt: "2024-08-09T05:24:21.514Z",
        updatedAt: "2024-10-01T06:53:50.188Z",
        __v: 0,
      },
      {
        _id: "66c71dcf02626de7a4608e49",
        name: "journalism",
        is_active: true,
        createdAt: "2024-08-22T11:15:27.747Z",
        updatedAt: "2024-10-01T06:53:50.188Z",
        __v: 0,
      },
      {
        _id: "66c71dcf02626de7a4608e4e",
        name: "planning (urban)",
        is_active: true,
        createdAt: "2024-08-22T11:15:27.748Z",
        updatedAt: "2024-10-01T06:53:50.188Z",
        __v: 0,
      },
      {
        _id: "66b4af94c5c557792903ecc6",
        name: "animation",
        is_active: true,
        __v: 0,
        createdAt: "2024-08-08T11:44:20.788Z",
        updatedAt: "2024-10-01T06:53:50.188Z",
      },
      {
        _id: "66b5a3933b7b9e69989c2054",
        name: "anthropology",
        is_active: true,
        createdAt: "2024-08-09T05:05:23.851Z",
        updatedAt: "2024-10-01T06:53:50.188Z",
        __v: 0,
      },
    ],
  },
  {
    id: "66b348c7c5b9ab0a1b7a6367",
    name: "Engineering and Technology",
    is_active: true,

    category: [
      {
        _id: "66c71d0d02626de7a4608e36",
        name: "industrial",
        is_active: true,
        createdAt: "2024-08-22T11:12:13.168Z",
        updatedAt: "2024-09-30T08:31:02.008Z",
        __v: 0,
      },
      {
        _id: "66c71d0d02626de7a4608e39",
        name: "radiography",
        is_active: false,
        createdAt: "2024-08-22T11:12:13.168Z",
        updatedAt: "2024-09-30T08:31:02.008Z",
        __v: 0,
      },
      {
        _id: "66c71d0d02626de7a4608e2d",
        name: "architecture",
        is_active: true,
        createdAt: "2024-08-22T11:12:13.166Z",
        updatedAt: "2024-09-30T08:31:02.008Z",
        __v: 0,
      },
    ],
  },
];

const CustomSelect = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [idVar, setIdVar] = useState("");
  const [search, setSearch] = useState("");
  const { data, isPending } = useQuery({
    queryKey: ["study_area"],
    queryFn: courseFinderController.getStudyArea,
  });
  console.log(data, "DATA");

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box
          onClick={() => setMenuOpen((pre) => !pre)}
          component={"button"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid black",
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography>Field of Study</Typography>
          {menuOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </Box>
        {menuOpen && (
          <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
            <Paper
              sx={{ width: "30%", position: "absolute", zIndex: 999, p: 3 }}
            >
              <Box p={2}>
                <TextField size="small" fullWidth label="Search" onChange={(e)=>setSearch(e.target.value)}/>
              </Box>
              {names.map((name) => (
                <>
                  {!idVar ? (
                    <MenuItem value={name.name}>
                      <Checkbox />
                      <ListItemText primary={name.name} />
                      <span
                        onClick={(e) => {
                          e.stopPropagation(), setIdVar(name.id);
                        }}
                      >
                        <ChevronRightIcon />
                      </span>
                    </MenuItem>
                  ) : (
                    <>
                      {idVar == name.id && (
                        <>
                          <MenuItem
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span
                              onClick={(e) => {
                                e.stopPropagation(), setIdVar("");
                              }}
                            >
                              <ArrowBackIcon />
                            </span>
                            {name.name}
                          </MenuItem>
                          <Divider />
                          <div
                            style={{
                              maxHeight: "20vh",
                              overflowY:
                                name.category.length > 5 ? "scroll" : "hidden",
                            }}
                          >
                            {name.category.map((item) => (
                              <MenuItem value={item.name}>
                                <Checkbox checked={true} />
                                <ListItemText primary={item.name} />
                              </MenuItem>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              ))}
            </Paper>
          </ClickAwayListener>
        )}
      </Grid>
    </Grid>
  );
};

export default CustomSelect;
