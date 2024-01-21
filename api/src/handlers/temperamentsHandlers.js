const {getTemperaments} = require("../controllers/temperamentsControllers")


const getTemperamentsHandler = async(req,res) =>{
    try {
        const tempe = await getTemperaments()
        res.status(200).json(tempe)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = getTemperamentsHandler