import axios from "axios";

import { 
    GET_DOGS, 
    GET_BY_NAME, 
    GET_DETAIL,
    CLEAR_DETAIL, 
    GET_TEMPERAMENT, 
    POST_DOG,
    ORDER_BY_NAME,
    FILTER_BY_TEMPERAMENT,
    FILTER_CREATED,
    ORDER_WEIGHT
} from "./actions_Types";


export function getDogs(){
    return async function(dispatch){
        try {
            const response = await axios(`http://localhost:3001/dogs/`);
            
            dispatch({
                type: GET_DOGS,
                payload: response.data
            });
        } catch (error) {
            console.error("Error fetching dogs:", error);
        }
    }
}

export function getByName(name){
    return async function(dispatch){
        try {
            const response = await axios(`http://localhost:3001/dogs/?name=${name}`);
            
            dispatch({
                type: GET_BY_NAME,
                payload: response.data
            });
        } catch (error) {
            console.error("Error fetching dogs by name:", error);
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/dogs/${id}`);
            
            dispatch({
                type: GET_DETAIL,
                payload: response.data
            });
        } catch (error) {
            console.error(`Error fetching dog details for ID ${id}:`, error);
        }
    }
}

export function clearDetail(){
    return{
        type: CLEAR_DETAIL
    }
}

export function getTemperament() {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/temperaments`);
            
            dispatch({
                type: GET_TEMPERAMENT,
                payload: response.data
            });
        } catch (error) {
            console.error("Error fetching temperaments:", error);
        }
    };
}

export const postDog = (payload) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3001/dogs', payload);
        
        dispatch({
            type: POST_DOG,
            payload: response.data
        });
    } catch (error) {
        window.alert("Error adding new dog", error.message)
    }
};


export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload: payload
    }
}

export function orderWeight(orderType){
    return {
        type: ORDER_WEIGHT,
        payload: orderType
    }
}

export const filterTemperament = (temperament) => {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload: temperament
    }
}

export const filterCreateDog = (payload) => {
    return{
        type: FILTER_CREATED,
        payload
    }
}
