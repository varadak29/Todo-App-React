import Mongoose from "mongoose";

/**
 * Todo list items and its description in json schema
 */
const ContactSchema = new Mongoose.Schema({
    "title" : {
        type : String,
        required: "Title is mandatory field!"
    },
    "description" : {
        type : String,
        required: "Description is mandatory field!"
    },
    "dueDate" : {
        type : String,
        required: "dueDate is mandatory field!"
    },
    "time" : {
        type : String,
        required: "time is mandatory field!"
    },
    "status" : {
        type : Boolean,
        default : false
    }
},
{
    versionKey : false
});

ContactSchema.virtual('id', () => this._id.toHexString());
ContactSchema.set('toJSON', { virtuals: true});
const Contact = Mongoose.model('Contact', ContactSchema);

export default Contact;