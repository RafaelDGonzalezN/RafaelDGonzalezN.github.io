const {Temperament} = require ("../db")
const axios = require ("axios")

const getTemperaments = async () =>{
    const apiRaw = await axios("https://api.thedogapi.com/v1/breeds");

    let temperament = apiRaw.data.map(dog => dog.temperament ? dog.temperament : "No Info").map(dog => dog?.split(", "));
    let eachTemperament = [...new Set(temperament.flat())];
    eachTemperament.forEach(temp => {
        if(temp) {
            Temperament.findOrCreate({where: {name: temp}})
        }
    })
    eachTemperament = await Temperament.findAll();
    return eachTemperament
}

module.exports = {
    getTemperaments
}