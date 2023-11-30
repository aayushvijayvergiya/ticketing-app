import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@avijay_lib/ticketing-common';
import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes/index';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';

const app = express();
app.set('trust proxy', true); // To tell express to trust requests being proxied from nginx
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
)

app.use(currentUser);

app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);

/* 
app.all('*', () => {
    throw new NotFoundError()
})
 */

// Handled by express-async-errors
app.all('*', async () => {
    throw new NotFoundError()
})

/*
For async scenraios
app.all('*', async (req, res, next) => {
    next(new NotFoundError())
})
*/

app.use(errorHandler);

export { app }