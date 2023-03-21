import { Entry, Diagnosis } from '../../types';
import Box from '@mui/material/Box';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';


type EntryDisplayProps = {
    entry: Entry,
    diagnoses: Diagnosis[]
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
}

function getTitleByCode(code: string, diagnosesList: Diagnosis[]) : string | null {
    const diagnosis = diagnosesList.find(diagnosis => diagnosis.code === code);
    if(diagnosis !== undefined && diagnosis !== null) return diagnosis.name;
    return null;
}

function getHealthCheckIcon(rating: number): JSX.Element {
    switch(rating){
        case 0:
            return <FavoriteIcon sx={{ color: 'green'}}/>
        case 1:
            return <FavoriteIcon sx={{ color: 'yellow '}} />
        case 2:
            return <FavoriteIcon sx={{ color: 'orange '}} />
        case 3:
            return <FavoriteIcon sx={{ color: 'red' }} />
        default:
            return <></>
    }
}

const HealthCheck = (props: EntryDisplayProps) => {
    if(!('healthCheckRating' in props.entry)) return null;
    return (
        <Box mb={2} p ={1} sx={{ border: 2, borderRadius: 2 }}>
            <div>{props.entry.date} {<LocalHospitalIcon />}</div>
            <div>{props.entry.description}</div>
            <div>{getHealthCheckIcon(props.entry.healthCheckRating)}</div>
            <div>diagnosed by {props.entry.specialist}</div>
        </Box>
    )
}

const OccupationalHealthcare = (props: EntryDisplayProps) => {
    if(!('employerName' in props.entry)) return null;
    return(
        <>
            <Box mb={2} p={1} sx={{ border: 2, borderRadius: 2 }}>
                <div>{props.entry.date} {<WorkIcon />} {props.entry.employerName} </div>
                <div>{props.entry.description}</div>
                <ul>
                    {props.entry.diagnosisCodes?.map(code => <li>{code} {getTitleByCode(code,props.diagnoses)}</li>)}
                </ul>
                <div>diagnosed by {props.entry.specialist}</div>
            </Box>
        </>
    )
}

const HospitalEntry = ({entry} : { entry: Entry }) => {
    if(!('discharge' in entry)) return null;
    return (
        <>
            <Box mb={2} p={1} sx={{ border: 2, borderRadius: 2 }}>
                <div>{entry.date} {<LocalHospitalIcon />}</div>
                <div>{entry.description}</div>
                <div>diagnosed by {entry.specialist}</div>
                <div>discharge date: {entry.discharge.date}</div>
            </Box>
        </>
    )
}




const EntryDisplay = (props: EntryDisplayProps) => {
    switch(props.entry.type){
        case "Hospital":
            return <HospitalEntry entry={props.entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={props.entry} diagnoses={props.diagnoses} />;
        case "HealthCheck":
            return < HealthCheck entry={props.entry} diagnoses={props.diagnoses} />;
        default:
            return assertNever(props.entry);
    }
}

export default EntryDisplay;