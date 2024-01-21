const {getDogs, getDogById, getDogsByName, postDog} = require("../controllers/dogsControllers")
    
const getDogsHandler = async(req,res) =>{
    const {name} = req.query
    try {
        if(name){
            const dogsName = await getDogsByName(name)
            res.status(200).json(dogsName)
        }else{
             const dogsAll = await getDogs()
             res.status(200).json(dogsAll)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getDogsIdHandler = async(req,res) => {
    const {id} = req.params
    const source = isNaN(id) ? "bdd" : "api"

    try {
        const dog = await getDogById(id, source)
        res.status(200).json(dog)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postDogsHandler = async (req,res) =>{
    try {
        const {image, name, temperament, height, weight, life_span} = req.body

        const newDog = await postDog(image, name, temperament, height, weight, life_span)
        
        res.status(201).json(newDog)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getDogsHandler,
    getDogsIdHandler,
    postDogsHandler
}