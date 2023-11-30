import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@avijay_lib/ticketing-common';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';

const app = express();
app.set('trust proxy', true); // To tell express to trust requests being proxied from nginx
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
)

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

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