import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Typography } from "@mui/material";
import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FilterSearch } from "src/configs/g_components/filterSearch";
import { UniversityCard } from "src/configs/g_components/UniversityCard";

const CourseFinder = () => {
return (
        <>
<Grid container spacing={4}>
<Grid item xs={12}  lg={2.5}>
    <Card >
        <CardContent>
            <Typography p={2}>Filter</Typography>
            <FormGroup sx={{ml:5}}>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Only Open Programs" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Co op Programs" />

    </FormGroup>

        <Divider sx={{my:5}}/>

    <Grid item xs={12}>

        <Accordion sx={{"&.MuiAccordion-root":{
            boxShadow:"none"
        }}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
 
        >
Country
        </AccordionSummary>
        <AccordionDetails>
        <FormGroup sx={{ml:5}}>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Only Open Programs" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Co op Programs" />

    </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{my:5}}/>
    </Grid>
    <Grid item xs={12}>

        <Accordion sx={{"&.MuiAccordion-root":{
            boxShadow:"none"
        }}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
 
        >
State
        </AccordionSummary>
        <AccordionDetails>
        <FormGroup sx={{ml:5}}>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Only Open Programs" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Co op Programs" />

    </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{my:5}}/>
    </Grid>
    <Grid item xs={12}>

        <Accordion sx={{"&.MuiAccordion-root":{
            boxShadow:"none"
        }}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
 
        >
City
        </AccordionSummary>
        <AccordionDetails>
        <FormGroup sx={{ml:5}}>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Only Open Programs" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Co op Programs" />

    </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{my:5}}/>
    </Grid>
    <Grid item xs={12}>

        <Accordion sx={{"&.MuiAccordion-root":{
            boxShadow:"none"
        }}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
 
        >
University/College
        </AccordionSummary>
        <AccordionDetails>
        <FormGroup sx={{ml:5}}>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Only Open Programs" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Co op Programs" />

    </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{my:5}}/>
    </Grid>
    <Grid item xs={12}>

        <Accordion sx={{"&.MuiAccordion-root":{
            boxShadow:"none"
        }}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
 
        >
Program Type
        </AccordionSummary>
        <AccordionDetails>
        <FormGroup sx={{ml:5}}>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Only Open Programs" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Co op Programs" />

    </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{my:5}}/>
    </Grid>
    <Grid item xs={12}>

        <Accordion sx={{"&.MuiAccordion-root":{
            boxShadow:"none"
        }}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
 
        >
Course Length
        </AccordionSummary>
        <AccordionDetails>
        <FormGroup sx={{ml:5}}>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Only Open Programs" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Co op Programs" />

    </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{my:5}}/>
    </Grid>
    <Grid item xs={12}>

        <Accordion sx={{"&.MuiAccordion-root":{
            boxShadow:"none"
        }}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
 
        >
Campus
        </AccordionSummary>
        <AccordionDetails>
        <FormGroup sx={{ml:5}}>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Only Open Programs" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Co op Programs" />

    </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{my:5}}/>
    </Grid>



 </CardContent>
    </Card>
</Grid>
<Grid item xs={12} lg={9}>
    <Grid container spacing={4}>
        <Grid item xs={12}>
        <Card>
        <CardContent>
            <FilterSearch/>

        </CardContent>
    </Card>
        </Grid>
        <Grid item xs={12}>

<UniversityCard/>
        </Grid>
        <Grid item xs={12}>

<UniversityCard/>
        </Grid>
        <Grid item xs={12}>

<UniversityCard/>
        </Grid>
        <Grid item xs={12}>

<UniversityCard/>
        </Grid>
    </Grid>

</Grid>

</Grid>
        </>
    )
}
export default CourseFinder;