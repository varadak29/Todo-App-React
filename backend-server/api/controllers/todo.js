import { request, response } from 'express';
import Contact from '../models/todo.js';
import * as contactService from '../services/todo.js'

/**
 * 
 * @param {*} message 
 * @param {*} response 
 * Error Handling
 */
const errorhandler = (message, response) => {
    response.status(500);
    response.json({ error: message });
};

/**
 * 
 * @param {*} data 
 * @param {*} response 
 * Set if response is successful
 */
const setSuccessResponse = (data, response) => {
    response.status(200);
    response.json(data);
};

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * traversing through todolist database
 */
export const index = async (request, response) => {
    try {
        const contacts = await contactService.search();
        setSuccessResponse(contacts, response);
    }
    catch (e) {
        errorhandler(e.message, response);
    }

};

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * Saving todolist
 */
export const save = async (request, response) => {
    try {
        const contact = { ...request.body };
        const newContact = await contactService.create(contact);
        setSuccessResponse(newContact, response);
    }
    catch (e) {
        errorhandler(e.message, response);
    }
};

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * Get particular todo item by passing id
 */
export const get = async (request, response) => {
    try{
        const id = request.params.id;
        const contact = await contactService.get(id);
        setSuccessResponse(contact, response);
    }
    catch(e){
        errorhandler(e.message, response);
    }
};

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * Update a paticular todo list by passing id
 */
export const update = async (request, response) => {
    try{
        const id = request.params.id;
        const contact = {...request.body, id};
        const updatedContact = await contactService.update(contact);
        setSuccessResponse(updatedContact, response);
    }
    catch(e){
        errorhandler(e.message, response);
    }
};

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * Removing an item from todolist
 */
export const remove = async (request, response) => {
    try{
        const id = request.params.id;
        const contact = await contactService.remove(id);
        setSuccessResponse({ message: `Contact ${id} remove successfully.`}, response);
    }
    catch(e){
        errorhandler(e.message, response);
    }
};