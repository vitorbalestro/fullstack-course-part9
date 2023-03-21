import { useState, SyntheticEvent } from 'react';
import {  TextField, Button, Typography, Box, Alert, Grid, MenuItem } from '@mui/material';
import patientsService from '../../services/patients';


interface OccupationalHealthcareFormProps {
    id: string,
    setFormType: React.Dispatch<React.SetStateAction<string>>,
    allDiagnoses: string[],
    setRefetchData: React.Dispatch<React.SetStateAction<boolean>>
}

const OccupationalHealthcareForm = (props: OccupationalHealthcareFormProps) => {

    const [ description, setDescription ] = useState('');
    const [ date, setDate ] = useState('');
    const [ specialist, setSpecialist ] = useState('');
    const [ employer, setEmployer ] = useState('');
    const [ diagnosisCodes, setDiagnosisCodes ] = useState<string[]>([]);
    const [ startDate , setStartDate ] = useState('');
    const [ endDate, setEndDate ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');   

    const addOccupationalHealthcareEntry = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            
            const object = {
                description: description,
                date: date,
                specialist: specialist,
                employerName: employer,
                diagnosisCodes: diagnosisCodes,
                type: "OccupationalHealthcare",
                sickLeave: {
                    startDate: startDate,
                    endDate: endDate
                }
            }
            await patientsService.createEntry(object,props.id);
            setDescription('');
            setDate('');
            setSpecialist('');
            setEmployer('');
            setDiagnosisCodes([]);
            setStartDate('');
            setEndDate('');
            props.setFormType('');
            props.setRefetchData(true);
        } catch (error) {
            setErrorMessage('Something went wrong. Please try again.');
            if(error instanceof Error) {
                setErrorMessage('Something went wrong. Error: ' + error.message);
            } 
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    }


    return(
        
        <div>
            {errorMessage !== ''
            ? <Alert severity="error">{errorMessage}</Alert>
            : <></>}
            <Box mb={60} mt={5} p={3} pb={7} sx={{ border: 1, borderRadius: 2, borderStyle:"dashed" }}>
                <Typography variant="h6" gutterBottom>
                    New Occupational Healthcare Entry
                </Typography>
                <form onSubmit={addOccupationalHealthcareEntry}>
                    <TextField style={{ marginTop: 10 }}
                        label="Employer"
                        fullWidth 
                        value={employer}
                        onChange={({ target }) => setEmployer(target.value)}
                    />
                    <TextField style={{ marginTop: 10 }}
                        label="Description"
                        fullWidth 
                        value={description}
                        onChange={({ target }) => setDescription(target.value)}
                    />
                    <TextField style={{ marginTop: 10 }}
                        label="Specialist"
                        fullWidth 
                        value={specialist}
                        onChange={({ target }) => setSpecialist(target.value)}
                    />
                    <TextField style={{ marginTop: 10 }}
                        label="Diagnosis Codes"
                        fullWidth
                        select
                        SelectProps={{
                            multiple: true,
                            value: diagnosisCodes,
                        }}
                        onChange={({ target }) => {
                            if(!diagnosisCodes.includes(target.value)) {
                                const codesArray = target.value.toString().replaceAll('[','').replaceAll(']','').replaceAll(' ','').split(',');
                                setDiagnosisCodes(codesArray);
                            }
                        }}>
                        {props.allDiagnoses.map(diagnosis => <MenuItem key={diagnosis} value={diagnosis}>{diagnosis}</MenuItem>)}    
                    </TextField>                 
                    <TextField style={{ marginTop:15 }}
                        label="Date"
                        defaultValue={''}
                        fullWidth
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        onChange={({ target }) => setDate(target.value)}    
                    />
                    <Typography style={{ marginTop:20 }} variant="subtitle1">
                        Sick Leave
                    </Typography>

                    <TextField style={{ marginTop:15 }}
                        label="Start Date"
                        defaultValue={''}
                        fullWidth
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        onChange={({ target }) => setStartDate(target.value)}    
                    />    
                    <TextField style={{ marginTop:10 }}
                        label="End Date"
                        defaultValue={''}
                        fullWidth
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        onChange={({ target }) => setEndDate(target.value)}    
                    />                    
                    <Grid style={{ marginTop: 20 }}>
                        <Button 
                            style={{
                                float: "right",
                                marginBottom: 60
                            }}
                            type="submit"
                            variant="contained"
                        >
                        Add
                        </Button>
                        <Button 
                            style={{
                                float: "left",
                                marginBottom: 60,
                                backgroundColor:"red"
                            }}
                            onClick={() => {props.setFormType('')}}
                            variant="contained"
                        >
                        Cancel
                        </Button>
                    </Grid>
                </form>
            </Box>
        </div>
    )
}

export default OccupationalHealthcareForm;
