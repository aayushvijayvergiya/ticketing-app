import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@avijay_lib/ticketing-common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from "./routes/update";

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

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

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