import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const asyncScript = promisify(scrypt);

export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');

        const hashedPasswordBuffer = (await asyncScript(password, salt, 64)) as Buffer;

        return `${hashedPasswordBuffer.toString('hex')}.${salt}`
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const [storedHashedPassword, salt] = storedPassword.split('.');

        const hashedPasswordBuffer = (await asyncScript(suppliedPassword, salt, 64)) as Buffer;

        return hashedPasswordBuffer.toString('hex') === storedHashedPassword
    }
}
