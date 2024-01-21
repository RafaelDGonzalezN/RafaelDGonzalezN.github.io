export const calcuteWeightAverage = (weight) =>{
    if (!weight){
        return -1
    }

    const [min,max] = weight.split(' - ').map(parseFloat);

    if(isNaN(min) || isNaN(max)){
        return -1
    }

    const average = (min + max) / 2;

    return isNaN(average) ? -1 : average;
} 