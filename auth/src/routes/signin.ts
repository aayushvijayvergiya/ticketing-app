import express, { Response, Request } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '@avijay_lib/ticketing-common';
import { validateRequest } from '@avijay_lib/ticketing-common';
import { User } from '../models/user';
import { Password } from '../services/Password';

const router = express.Router();

router.post('/api/users/signin', 
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password must be entered')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await  User.findOne({ email })
    
    if(!existingUser) {
      console.log('User not present!')
      throw new BadRequestError('Invalid credentials!');
    }

    const passwordMatch = await Password.compare(existingUser.password, password);

    if(!passwordMatch) {
      console.log('Password incorrect')
      throw new BadRequestError('Invalid credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign({
      id: existingUser.id,
      email: existingUser.email 
    }, process.env.JWT_KEY!);

    // Store it on session object
    req.session = {
      jwt: userJwt
    }

    console.log('User signed in!')
    
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
