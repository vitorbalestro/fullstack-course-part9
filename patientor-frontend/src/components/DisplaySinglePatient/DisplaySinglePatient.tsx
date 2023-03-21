import { useState } from 'react';
import React from 'react';
import { Patient, Diagnosis } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryDisplay from './DisplayEntries';
import HealthCheckForm from '../AddEntryModal/HealthCheckForm';
import HospitalForm from '../AddEntryModal/HospitalForm';
import OccupationalHealthcareForm from '../AddEntryModal/OccupationalHealthcareForm';
import { Button, MenuItem, Menu, Grid } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

function patientGenderIcon(patient: Patient): JSX.Element {
    if(patient.gender === 'male') return <MaleIcon />;
    if(patient.gender === 'female') return <FemaleIcon />;
    return (<></>);
}

type DisplaySinglePatientProps = {
    patient: Patient | null | undefined;
    diagnoses: Diagnosis[];
    setRefetchData: React.Dispatch<React.SetStateAction<boolean>>
}


const DisplaySinglePatient = (props: DisplaySinglePatientProps) => {

    const [ formType, setFormType ] = useState('');

    const allDiagnosisCodes = props.diagnoses.map(diag => diag['code']);


    if(!props.patient) return (
        <div>Patient not found!</div>
    )

    const Form = () => {
        if(props.patient && formType === 'HealthCheck'){
            return <HealthCheckForm setRefetchData={props.setRefetchData} id={props.patient.id} setFormType={setFormType} allDiagnoses={allDiagnosisCodes}/> 
        }
        if(props.patient && formType === 'Hospital'){
            return <HospitalForm setRefetchData={props.setRefetchData}id={props.patient.id} setFormType={setFormType} allDiagnoses={allDiagnosisCodes}/>
        }
        if(props.patient && formType === 'OccupationalHealthcare') {
            return <OccupationalHealthcareForm setRefetchData={props.setRefetchData} id={props.patient.id} setFormType={setFormType} allDiagnoses={allDiagnosisCodes}/>
        }
        if(props.patient && formType === ''){
            return <AddEntryButton />
        }
        return <></>
    }

    const AddEntryButton = () => {
        return(
            <Grid mt={5} mb={30}> 
                <PopupState variant="popover" popupId="add-entry-button">
                    {(popupState) => (
                        <React.Fragment>
                            <Button variant="contained" {...bindTrigger(popupState)}>
                                Add New Entry
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={() => setFormType('HealthCheck')}>Health Check</MenuItem>
                                <MenuItem onClick={() => setFormType('Hospital')}>Hospital</MenuItem>
                                <MenuItem onClick={() => setFormType('OccupationalHealthcare')}>Occupational Healthcare</MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            </Grid>
        )
    }

    return (
        <div>
            <h2>{props.patient.name} {patientGenderIcon(props.patient)}</h2>
            <div>
                ssn: {props.patient.ssn}
            </div>
            <div>
                occupation: {props.patient.occupation}
            </div>
            <h2>entries</h2>
            {props.patient.entries.length !== 0 ?
                <>
                    {props.patient.entries.map(entry => <EntryDisplay key={entry.description} entry={entry} diagnoses={props.diagnoses} />)}
                </>
            : <div>No entries found for this patient.</div>    
            } 
            <Form />  
        </div>
    )

}

export default DisplaySinglePatient;