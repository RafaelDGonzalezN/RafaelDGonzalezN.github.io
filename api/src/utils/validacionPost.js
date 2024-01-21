const validate = (req, res, next) =>{

    const {image, name, height, weight, life_span} = req.body
    if(!image) return res.status(400).json({error: "Missing image"})
    if(!name) return res.status(400).json({error: "Missing name"})
    if(!height) return res.status(400).json({error: "Missing height"})
    if(!weight) return res.status(400).json({error: "Missing weight"})
    if(!life_span) return res.status(400).json({error: "Missing life_span"})
    next();
} 
module.exports = {validate}