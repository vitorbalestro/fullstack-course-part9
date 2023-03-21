import patientsList from '../data/patients';
import { Patient, NonSensitivePatientInfo, NewPatient, EntryWithoutId, Entry } from '../types';
const { v4: uuidv4 } = require('uuid');


const getEntries = (): Patient[] => {
    return patientsList;
};

const getPatientById = (id: string): Patient | null => {
    const patient = patientsList.find(p => p.id === id);
    if(patient) return patient;

    return null;
}

const getNonSensitiveEntries = (): NonSensitivePatientInfo[] => {
    return patientsList.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};

const addPatient = (entry: NewPatient) : Patient => {

    const addedPatient = {
        ...entry,
        id: uuidv4(),
    };

    patientsList.push(addedPatient);
    return addedPatient;
};


const addEntry = (entry: EntryWithoutId, id: string): Entry => {
    const addedEntry = {
        ...entry,
        id:uuidv4(),
    }
    const patient = patientsList.find(patient => patient.id === id);
    patient?.entries.push(addedEntry);

    return addedEntry;
}

export default { getEntries, getNonSensitiveEntries, addPatient, getPatientById, addEntry }