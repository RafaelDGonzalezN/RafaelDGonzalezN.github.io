const { Router } = require('express');
const dogsRouter = Router()
const {validate} = require ("../utils/validacionPost")
const {
    getDogsHandler,
    getDogsIdHandler,
    postDogsHandler
} = require("../handlers/dogsHandlers")



dogsRouter.get("/", getDogsHandler) 

dogsRouter.get("/:id",getDogsIdHandler)

dogsRouter.post("/",validate, postDogsHandler)

module.exports = dogsRouter