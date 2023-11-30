import mongoose from 'mongoose';
import { app } from './app';

const PORT = 4001;

const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    if(!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
        })
    } catch (err){
        console.error('Error:', err);
    }

    app.listen(PORT, () => {
        console.log(`Server listening at ${PORT}!`);
    })
}

start();

