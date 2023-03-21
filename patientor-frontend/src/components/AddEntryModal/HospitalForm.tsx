import { useState, SyntheticEvent } from 'react';
import patientsService from '../../services/patients';
import { TextField, Button, Typography, Box, Alert, Grid, MenuItem } from '@mui/material';


interface HospitalFormProps {
    id: string,
    setFormType: React.Dispatch<React.SetStateAction<string>>,
    allDiagnoses: string[],
    setRefetchData: React.Dispatch<React.SetStateAction<boolean>>
}

const HospitalForm = (props: HospitalFormProps) => {

    const [ description, setDescription ] = useState('');
    const [ date, setDate ] = useState('');
    const [ specialist, setSpecialist ] = useState('');
    const [ diagnosisCodes, setDiagnosisCodes ] = useState<string[]>([]);
    const [ dischargeDate, setDischargeDate ] = useState('');
    const [ dischargeCriteria, setDischargeCriteria ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');

    const addHospitalEntry = async (event: SyntheticEvent) => {
        event.preventDefault();
        try{
            const object = {
                description: description,
                date: date,
                specialist: specialist,
                diagnosisCodes: diagnosisCodes,
                discharge: {
                    date: dischargeDate,
                    criteria: dischargeCriteria,
                },
                type: "Hospital"
            };
            await patientsService.createEntry(object, props.id);
            setDescription('');
            setDate('');
            setSpecialist('');
            setDiagnosisCodes([]);
            setDischargeDate('');
            setDischargeCriteria('');
            props.setFormType('');
            props.setRefetchData(true);
        } catch (error) {
            setErrorMessage('Something went wrong. Please try again.');
            if(error instanceof Error) {
                setErrorMessage('Something went wrong. Error: ' + error.message);
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            }
        }
    }

    return (
        <div>
            {errorMessage !== ''
            ?<Alert severity="error">{errorMessage}</Alert>
            : <></>}
            <Box mb={60} mt={5} p={3} pb={7} sx={{ border: 1, borderRadius: 2, borderStyle:"dashed" }}>
                <Typography variant="h6" gutterBottom>
                    New Hospital Entry
                </Typography>
                <form onSubmit={addHospitalEntry}>
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
                    <TextField style={{ marginTop:15 }}
                        label="Admission Date"
                        defaultValue={''}
                        fullWidth
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        onChange={({ target }) => setDate(target.value)}    
                    />
                    <TextField style={{ marginTop:50 }}
                        label="Discharge Date"
                        defaultValue={''}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        type="date"    
                        onChange={({ target }) => setDischargeDate(target.value)}
                    />
                    <TextField style={{ marginTop: 10 }}
                        label="Discharge Criteria"
                        fullWidth 
                        value={dischargeCriteria}
                        onChange={({ target }) => setDischargeCriteria(target.value)}
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

export default HospitalForm;