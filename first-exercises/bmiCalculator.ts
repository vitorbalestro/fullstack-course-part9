
const calculateBmi = (height: number, weight: number) : string => {

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters*heightInMeters);

    if(bmi < 16) return 'Underweight (severe thinness)';
    else if(bmi < 16.9) return 'Underweight (moderate thinness)';
    else if(bmi < 18.4) return 'Underweight (mild thinness)';
    else if(bmi < 24.9) return 'Normal (healthy weight)';
    else if(bmi < 29.9) return 'Overweight (pre-obese)';
    else if(bmi < 34.9) return 'Obese (class I)';
    else if(bmi < 39.9) return 'Obese (class II)';
    else return 'Obese (class III)';

};


export default calculateBmi;