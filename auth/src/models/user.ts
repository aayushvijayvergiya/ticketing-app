import mongoose from "mongoose";
import { Password } from "../services/Password";

/**
 * An interface that describes the properties that 
 * are required to create a new user
 */
interface UserAttrs {
    email: string,
    password: string
}

/**
 * An interface that describes the properties
 * that a user model has
 */
interface UserModel extends mongoose.Model<UserDocument>{
    build(attrs: UserAttrs): UserDocument;
}

/**
 * An interface that describes the properties
 * that a user document has
 */
interface UserDocument extends mongoose.Document {
    email: string,
    password: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.password
            // delete ret.__v 
        }
    },
    versionKey : false
}    
);

userSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

// const user = User.build({ email: '', password: ''}) // Return type is UserDocument

/**
 * This function is an intermediate step to 
 * involve type checking while creating a new object
 * @param attrs 
 * @returns 
 */
/*
const buildUser = (attrs: UserAttrs) => {
    return new User(attrs)
}
 */
export { User }