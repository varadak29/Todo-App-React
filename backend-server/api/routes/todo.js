import express from 'express';
import * as contactController from '../controllers/todo.js'

const router = express.Router();

router.route('/todolist')
    .get(contactController.index)
    .post(contactController.save);
    

router.route('/todolist/:id')
    .get(contactController.get)
    .put(contactController.update)
    .delete(contactController.remove);
    
export default router;