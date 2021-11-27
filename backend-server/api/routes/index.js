import contactRouter from './todo.js';

export default (app) => {
    /* Contact Router */
    app.use('/', contactRouter);
}