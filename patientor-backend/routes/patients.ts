/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils'

const router = express.Router();

router.get('/', (_req,res) =>{
    
    res.send(patientsService.getEntries());
});

router.get('/:id', (req,res) => {
    
    const id = req.params.id;
    res.send(patientsService.getPatientById(id));
});

router.post('/', (req, res) => {
    try{
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if(error instanceof Error) {
            errorMessage += ' Error: '+ error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req,res) => {
    try{
        const newEntry = toNewEntry(req.body);
        const id = req.params.id;
        const addedEntry = patientsService.addEntry(newEntry,id);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if(error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})

export default router;