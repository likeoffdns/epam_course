import Joi from 'joi';
import { User } from '../db/types/user';

export const validateUser = (user: User) => {
    const userSchema = Joi.object<User>({
        login: Joi.string().required(),
        password: Joi.string().regex(/^[A-Za-z0-9]*$/).required(),
        age: Joi.number().min(4).max(130).required(),
        isDeleted: Joi.boolean().required()
    });
    return userSchema.validate(user);
};
