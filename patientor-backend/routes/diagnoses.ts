import express from 'express';
import diagnosesService from '../services/diagnosesService'

const router = express.Router();

router.get('/', (_req,res) =>{
    
    res.send(diagnosesService.getEntries())
});

router.get('/:code', (req,res) => {
    const code = req.params.code;
    res.send(diagnosesService.getDiagnosisByCode(code));
})

export default router;