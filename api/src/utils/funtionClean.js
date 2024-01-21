const cleanDog = (arr) =>
    arr.map((e) =>{
        return{
            id: e.id,
            image: e.image.url,
            name: e.name,
            temperament: e.temperament,
            height: e.height.metric,
            weight: e.weight.metric,
            life_span: e.life_span,
            created: false,
        }
    })

const cleanDogId = (data, dogImagen) => {
    return {
        id: data.id,
        name: data.name,
        image: dogImagen.data.url,
        weight: data.weight.metric,
        height: data.height.metric,
        life_span: data.life_span,
        temperament: data.temperament,
    };
};
module.exports = {cleanDog, cleanDogId};