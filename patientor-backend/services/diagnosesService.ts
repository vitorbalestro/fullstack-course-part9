import diagnosesList from '../data/diagnoses'
import { Diagnosis } from '../types'

const getEntries = (): Diagnosis[] => {
    return diagnosesList
}

const getDiagnosisByCode = (code: string): Diagnosis | null => {
    const diagnosis = diagnosesList.find(diagnosis => diagnosis.code === code);
    if(diagnosis !== undefined) return diagnosis;
    return null;
}

const addDiagnose = () => {
    return null;
}

export default {
    getEntries,
    addDiagnose,
    getDiagnosisByCode
}