import { NewPatient, Gender, Entry, EntryWithoutId, EntryType, Diagnosis } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const parseString = (text: unknown): string => {
    if(!text || !isString(text)){
        throw new Error('Incorrect type (string expected)');
    }
    return text;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
}

const parseName = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Incorrect of missing ssn');
    }
    return ssn;
}

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)){
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isString(gender) || !isGender(gender)){
        throw new Error('Incorrect or missing gender: ' + gender);
    };
    return gender;
};

const isEntryType = (param: string): param is EntryType => {
    return Object.values(EntryType).map(v  => v.toString()).includes(param);
}

const parseEntryType = (type: unknown): EntryType => {
    if(!type || !isString(type) || !isEntryType(type)) {
        throw new Error('Incorrect entry type: ' + type);
    }
    return type;
}

const isEntry = (param: object): param is Entry => {
    if(!param || !('type' in param)) throw new Error('Incorrect Entry');
    if(!(param.type === 'Hospital' || param.type === 'HealthCheck' || param.type === 'OccupationalHealthcare')){
        throw new Error('Incorrect entry data');
    }
    if ('date' in param && 'description' in param && 'specialist' in param) { 
        return true;
    } else {
        throw new Error('Missing entry fields.');
    }
}

const isEntryArray = (params: unknown[]): params is Entry[] => {
    if(params.length === 0) return true;
    for(var entry of params) {
        if(typeof entry !== 'object' || entry === null || !isEntry(entry)){
            throw new Error('Incorrect entry data.' + entry);
        }
    }
    return true;
}

const parseEntries = (entries: unknown[]): Entry[] => {
    if(!isEntryArray(entries)) {
        throw new Error('Incorrect entries.');
    }
    return entries;
}

export const toNewPatient = (object: unknown) : NewPatient => {
    if(!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }
    if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object && Array.isArray(object.entries)){
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: parseEntries(object.entries)
        };

        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing.');
};

const parseHealthCheckRating = (object: unknown): number => {
    if(!(object === 0 || object === 1 || object === 2 || object === 3)) {
        throw new Error('Incorrect entry data (healthcheck rating');
    }
    return object;
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
}

type Discharge = {
    date: string,
    criteria: string,
}

const isDischarge = (object: unknown): object is Discharge => {
    const obj = object as object;
    if(!(Object.keys(obj).includes('date')) || !(Object.keys(obj).includes('criteria'))) {
        throw new Error('Missing discharge information.');
    }
    return true;
}

const parseDischarge = (object: unknown): Discharge => {
    if(!object || !isDischarge(object)){
        throw new Error('Discharge information missing.');
    }
    if(!isDate(object.date) || !isString(object.criteria)) {
        throw new Error('Incorrect discharge data.');
    }
    return object;
}

type SickLeave = {
    startDate: string,
    endDate: string,
}

const isSickLeave = (object: unknown): object is SickLeave => {
    const obj = object as object;
    if(!(Object.keys(obj).includes('startDate')) || !(Object.keys(obj).includes('endDate'))) {
        throw new Error('Missing sick leave information.');
    }
    return true;
}

const parseSickLeave = (object: unknown): SickLeave => {
    if(!object || !isSickLeave(object)){
        throw new Error('Sick leave information missing.');
    }
    if(!isDate(object.startDate) || !isDate(object.endDate)) {
        throw new Error('Incorrect sick leave data.');
    }
    return object;
}

export const toNewEntry = (object: unknown) : EntryWithoutId => {
    if(!object || !isEntry(object)) {
        throw new Error('Incorrect entry data.');
    }

    if('date' in object && 'specialist' in object && 'description' in object && 'type' in object){
        const baseNewEntry = {
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            description: parseString(object.description),
            type: parseEntryType(object.type)
        }
        var newEntry;
        switch(object.type){
            case "HealthCheck":
                newEntry = {
                    ...baseNewEntry,
                    healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                };
                break;
            case "Hospital":
               newEntry = {
                ...baseNewEntry,
                diagnosisCodes: parseDiagnosisCodes(object),
                discharge: parseDischarge(object.discharge),
               };
               break;
            case "OccupationalHealthcare":
                newEntry = {
                    ...baseNewEntry,
                    employerName: parseString(object.employerName),
                    diagnosisCodes: parseDiagnosisCodes(object),
                    sickLeave: parseSickLeave(object.sickLeave)
                }
        }

        return newEntry as EntryWithoutId;
    }
    throw new Error('Some fields are missing.');
}

/*export default { toNewPatient, toNewEntry };*/