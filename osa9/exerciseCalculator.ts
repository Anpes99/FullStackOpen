

interface exerciseCalculatorResults {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number
    ratingDescription: string
    target: number
    average: number
  }

const calculateExercises =( exerciseHours: Array<number>, targetHours: number): exerciseCalculatorResults =>{

    let rating
    let ratingDescription
    const daysTargetNotMet = exerciseHours.filter(dayHours => dayHours<targetHours)
    const percentTargetNotMet = daysTargetNotMet.length/exerciseHours.length
    if (percentTargetNotMet > 0.5){rating = 1; ratingDescription= "more than half the days target missed"}
    else if (percentTargetNotMet < 0.15 ){rating = 3; ratingDescription="target met on almost all days "}
    else {rating = 2; ratingDescription="not too bad but could be better"}

    return { 
        periodLength: exerciseHours.length,
        trainingDays: exerciseHours.filter(dayHours => dayHours > 0).length,
        success: daysTargetNotMet ? false: true,
        rating,
        ratingDescription,
        target: targetHours,
        average: exerciseHours.reduce((prev, cur)=> prev+ cur)/exerciseHours.length}
}


console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1] ,2))