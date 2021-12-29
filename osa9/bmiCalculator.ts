


const calculateBmi = (height:number,weight:number):string=>{
    const bmi = weight/(height*height)
if (bmi<18.4){
    return "underweight bmi: "+bmi}
else if (bmi>18.4 && bmi <25){
    return "normal range bmi: "+bmi}
else if (bmi>25){
    return "overweight or obese bmi: "+bmi}
}

console.log(calculateBmi(2.0,200))
