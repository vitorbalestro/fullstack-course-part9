const ratingDescription = (rating: number) : string => {
    if(1 <= rating && rating < 2) return 'Not that good, champs';
    else if(2 <= rating && rating < 2.5) return 'That\'s alright, homie';
    else return 'Rocky Balboa tier';
};

const trainedDays = (args: number[]) : number => {
    let trainedDays = 0;
    for(let i = 1; i < args.length; i++) {
        if(args[i] !== 0) trainedDays++;
    }
    return trainedDays;
};

const averageHours = (args: number[]) : number => {
    let sum = 0;
    for(let i = 1; i < args.length ; i++) sum = sum + args[i];
    const days = trainedDays(args);
    if(days !== 0) return sum / days;
    else return 0;
   
};

const averageTrainedDays = (args: number[]) : number => {
    if(args.length > 1) {
        return trainedDays(args) / (args.length-1);
    } else return 0;
};

const parseArguments = (args: string[]) : number[] => {
    if(args.length >= 4){
        const output_array = [];
        for(let i = 2; i < args.length; i++) {
            if(isNaN(Number(args[i]))) throw new Error('Invalid input.');
            else output_array.push(Number(args[i]));
        }
        return output_array;
    } else throw new Error('Invalid input (too few arguments).');
};

const ratingCalculator = (args: number[]) : number => {
    /* rating = 1 + average days trained + a score based on average daily hours */

    const avgDaysTraining = averageTrainedDays(args);
    const avgHours = averageHours(args);

    let hoursScore = 0;

    if(avgHours < 1) hoursScore = 1;
    if(1 <= avgHours && avgHours < 2) hoursScore = 1.5;
    if(avgHours >= 2) hoursScore = 2;

    return avgDaysTraining + hoursScore;

};   

interface exerciseParameters {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (inputArgs: string[]) : exerciseParameters => {
    
    const args = parseArguments(inputArgs);
    const periodLength = args.length - 1;
    const trainingDays = trainedDays(args);
    const avg = averageHours(args);
    let success = false;
    if(avg > 2) success = true;
    const rating = ratingCalculator(args);
    const ratingDescr = ratingDescription(rating);
    

    const output: exerciseParameters = { 
        periodLength: periodLength,
        trainingDays: trainingDays,
        success:success,
        rating: rating,
        ratingDescription: ratingDescr,
        target: args[0],
        average: avg,
     };

     return output;
};

export default calculateExercises;