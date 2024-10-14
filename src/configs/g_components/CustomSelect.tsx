import {
  Box,
  Card,
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

const CustomSelect = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [idVar, setIdVar] = useState("");
  const [search, setSearch] = useState("");
  const { data, isPending } = useQuery({
    queryKey: ["study_area"],
    queryFn: courseFinderController.getStudyArea,
  });
  const studyArea = data?.data;

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
              sx={{
                width: "30%",
                position: "absolute",
                zIndex: 999,
                p: 3,
              }}
            >
              <Box
                p={2}
                sx={{
                  position: "relative",
                  display: idVar ? "none" : "block",
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Box>
              <div style={{ maxHeight: "30vh", overflowY: "scroll" }}>
                {studyArea?.map((name: Record<string, any>) => (
                  <>
                    {!idVar && !search ? (
                      <MenuItem value={name.name}>
                        <Checkbox />
                        <ListItemText primary={name.name.toCapitalize()} />
                        <span
                          onClick={(e) => {
                            e.stopPropagation(),
                              setIdVar(name._id),
                              setSearch("");
                          }}
                        >
                          <ChevronRightIcon />
                        </span>
                      </MenuItem>
                    ) : (
                      (idVar == name._id || search) && (
                        <>
                          {idVar && (
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
                                {name.name.toCapitalize()}
                              </MenuItem>

                              <Divider />
                            </>
                          )}

                          {name?.category.map(
                            (item: Record<string, any>) =>
                              item.name.includes(search) && (
                                <MenuItem value={item.name}>
                                  <Checkbox checked={true} />
                                  <ListItemText
                                    primary={
                                      search
                                        ? `${(
                                            item.name as string
                                          ).toCapitalize()} (${name.name.slice(
                                            0,
                                            6
                                          )})...`
                                        : item.name.toCapitalize()
                                    }
                                  />
                                </MenuItem>
                              )
                          )}
                        </>
                      )
                    )}
                  </>
                ))}
              </div>
            </Paper>
          </ClickAwayListener>
        )}
      </Grid>
    </Grid>
  );
};

export default CustomSelect;
