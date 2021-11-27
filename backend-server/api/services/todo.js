import Contact from "../models/todo.js";

/**
 * 
 * @param {*} params 
 * @returns {todolisst[]} list of todo items
 */
export const search = (params = {}) => {
    const promise = Contact.find(params).exec();
    return promise;
};

/**
 * 
 * @param {*} contact 
 * @returns todolist by creating/adding todo items
 */
export const create = (contact) => {
    const newContact = new Contact(contact);
    return newContact.save();
};

/**
 * 
 * @param {*} id 
 * @returns todoitem by finding an item by given id
 */
export const get = (id) => {
    const promise = Contact.findById(id).exec();
    return promise;
};

/**
 * 
 * @param {*} contact 
 * @returns todolist by updating an item
 */
export const update = (contact) => {
    contact._id = contact.id;
    const promise = Contact.findByIdAndUpdate( contact.id, contact, { new: true }).exec();
    return promise;
};

/**
 * 
 * @param {*} id 
 * @returns todolist by removing an item by given id
 */
export const remove = (id) => {
    const promise = Contact.findByIdAndRemove(id).exec();
    return promise;
};