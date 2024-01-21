const {Dog, Temperament} = require ("../db")
const axios = require ("axios")
const { API_KEY } = process.env;
const URL =`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
const  {Op} = require ("sequelize")
const {cleanDog, cleanDogId} = require ("../utils/funtionClean")

const getDogs = async()=>{
    const dbDogs = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    }).then(dogs => dogs.map(dog => ({
        ...dog.dataValues,
        temperament: dog.temperaments.map(temp => temp.name).join(", ")
    })));
    ;
    
    const apiDogsRaw = (await axios.get(URL)).data

    const apiDogs = cleanDog(apiDogsRaw)

    return [...dbDogs, ...apiDogs]
}

const getDogById = async (id, source) => {
    let dog;

    if(source === "api"){
        const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`);
        const dogImagen = await axios(`https://api.thedogapi.com/v1/images/${data.reference_image_id}?api_key=${API_KEY}`);
        
        dog = cleanDogId(data, dogImagen)
    } else {
        dog = await Dog.findByPk(id, {
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        }).then((dog) => ({
            ...dog.dataValues,
            temperaments: dog.temperaments.map((temp) => temp.name),
        }));
    }

    return dog;
};

const getDogsByName = async (name) => {
    const dbDogs = await Dog.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });

    const apiDogsRaw = (await axios.get(URL)).data;
    const apiDogs = cleanDog(apiDogsRaw);

    const filterApi = apiDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
  
    return [...filterApi, ...dbDogs];
};

const postDog = async (image, name, temperament, height, weight, life_span) =>{
    
    dogCreate = await Dog.create({image, name, height, weight, life_span})

    const temperamentFilter = await Temperament.findAll({
        where: {name : temperament} })
     await dogCreate.addTemperaments(temperamentFilter)
     return dogCreate
}

module.exports = {
    getDogs,
    postDog, 
    getDogById,
    getDogsByName
}