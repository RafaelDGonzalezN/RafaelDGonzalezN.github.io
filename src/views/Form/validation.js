const validation = (input) => {
    const nameString = /^[a-zA-Z\s]+$/
    const numRegex = /^[0-9]+$/;
    const urlRegex = /^(http|https):\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/;
    const lifeRegex= /^[0-9\s-]+$/
    let errors = {};

    const minHeight = Number(input.height_min);
    const maxHeight = Number(input.height_max);
    const minWeight = Number(input.weight_min);
    const maxWeight = Number(input.weight_max);


    if (!input.name) {
        errors.name = "Write a name";
    } else if (!nameString.test(input.name)) {
        errors.name = "The name can't contain numbers or special characters";
    } else if (input.name.length > 25 || input.name.length < 4 ) {
        errors.name = "Must contain between 4 to 20 characters";
    } else if (input.name.startsWith(" ") === true){
        errors.name = "No puede ser un campo vacio"
    }

    
    if(!input.height_min){
        errors.height_min = "Write a number"
    } else if (!numRegex.test(input.height_min)){
        errors.height_min = "Can only contain numbers"
    } else if (input.height_min < 1) {
        errors.height_min = "Height min cannot be less than 0";
    } else if (minHeight >= maxHeight) {
        errors.height_min = "Height min cannot be greater than max";
    }
    
    if(!input.height_max){
        errors.height_max = "Write a number"
    } else if (!numRegex.test(input.height_max)){
        errors.height_max = "Can only contain numbers"
    } else if (input.height_max < 1) {
        errors.height_max = "Height max cannot be less than 0";
    } else if (input.height_max > 100) {
        errors.height_max = "Height max cannot be greater than 100";
    }
    if(!input.weight_min){
        errors.weight_min = "Write a number"
    } else if (!numRegex.test(input.weight_min)){
        errors.weight_min = "Can only contain numbers"
    } else if (input.weight_min < 0) {
        errors.weight_min = "Weight min cannot be less than 0";
    } else if (minWeight > maxWeight) {
        errors.weight_min = "Weight min cannot be greater than max";
    }

    if(!input.weight_max){
        errors.weight_max = "Write a number"
    } else if (!numRegex.test(input.weight_max)){
        errors.weight_max = "Can only contain numbers"
    } else if (input.weight_max < 0) {
        errors.weight_max = "Weight max cannot be less than 0";
    } else if (input.weight_max >100) {
        errors.weight_max = "Weight max cannot be greater than 62";
    }
    
    if (!input.life_span){
        errors.life_span = "Write the life span"
    } else if (input.life_span <= 0){
        errors.life_span = "Life span cannot be less than 0"
    } else if (!lifeRegex.test(input.life_span)){
        errors.life_span = "Separate the lifespan with a hyphen"
    }

    if (!input.image){
        errors.image = "Write an url"
    } else if (!urlRegex.test(input.image)) {
        errors.image = "The image must be a valid URL";
    }

    // if (input.temperament.length === 0){
    //     errors.temperament = "Select a temperament"
    // }

    return errors;
};

export default validation;