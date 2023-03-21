import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import bodyParser from 'body-parser';

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/hello', (_req,res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res) => {

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if(isNaN(height) || isNaN(weight)){
        res.send({ error: 'malformatted id' });
    }

    const bmi = calculateBmi(height,weight);

    res.send({
        height: height,
        weight: weight,
        bmi: bmi
    });

});

app.post('/exercises', (req,res) => {

    console.log(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
    const { daily_exercises, target } = req.body;

    if(!daily_exercises || !target){
        return res.status(400).send({ error: 'parameters missing'});
    }

    const completeArray = [ 'arg1', 'arg2', target ].concat(daily_exercises);

    for(let i = 2; i < completeArray.length; i++) {
        if(isNaN(Number(completeArray[i]))){
            return res.status(400).send({ error: 'malformatted parameters' });
        }
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(completeArray);

    return res.send(result);

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});