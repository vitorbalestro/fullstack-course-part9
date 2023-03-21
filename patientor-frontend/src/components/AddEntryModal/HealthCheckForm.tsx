import { useState, SyntheticEvent } from 'react';
import {  TextField, Button, Typography, MenuItem, Box, Alert, Grid } from '@mui/material';
import patientsService from '../../services/patients';


interface HealthCheckFormProps {
    id: string,
    setFormType: React.Dispatch<React.SetStateAction<string>>,
    allDiagnoses: string[],
    setRefetchData: React.Dispatch<React.SetStateAction<boolean>>
}

const HealthCheckForm = (props: HealthCheckFormProps) => {

    const [ description, setDescription ] = useState('');
    const [ date, setDate ] = useState('');
    const [ specialist, setSpecialist ] = useState('');
    const [ diagnosisCodes, setDiagnosisCodes ] = useState<string[]>([]);
    const [ healthCheckRating, setHealthCheckRating ] = useState(0);
    const [ errorMessage, setErrorMessage ] = useState('');
    


    const addHealthCheckEntry = async (event: SyntheticEvent) => {
        event.preventDefault();
        try{
            const object = {
                description: description,
                date: date,
                specialist: specialist,
                healthCheckRating: healthCheckRating,
                diagnosisCodes: diagnosisCodes,
                type: "HealthCheck"
            };
            await patientsService.createEntry(object,props.id);
            setDescription('');
            setDate('');
            setSpecialist('');
            setHealthCheckRating(-1);
            setDiagnosisCodes([]);
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
                    New HealthCheck Entry
                </Typography>
                <form onSubmit={addHealthCheckEntry}>
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
                        {props.allDiagnoses.map(diagnosis => <MenuItem key={diagnosis} value={diagnosis}>
                           {diagnosis}</MenuItem>)}    
                    </TextField>              
                    <TextField style={{ marginTop: 10 }}
                        label="Health Check Rating"
                        fullWidth
                        select
                        onChange={({ target }) => setHealthCheckRating(Number.parseInt(target.value.toString()))}
                    >
                        <MenuItem key={0} value={0}>Healthy</MenuItem>
                        <MenuItem key={1} value={1}>Low Risk</MenuItem>
                        <MenuItem key={2} value={2}>High Risk</MenuItem>
                        <MenuItem key={3} value={3}>Critical Risk</MenuItem>
                    </TextField>                  
                    <TextField style={{ marginTop:15 }}
                        label="Date"
                        defaultValue={''}
                        fullWidth
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        onChange={({ target }) => setDate(target.value)}    
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

export default HealthCheckForm;