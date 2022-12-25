import { Request, Response } from 'express';
import { database } from '../db/users';
import { User } from '../db/types/user';
import { userNotFound } from '../errors/users';
import { validateUser } from '../validation/users';
import { v4 as uuid4 } from 'uuid';
import * as utils  from '../utils';


let { users } = database;

export const getUserById = (req: Request, res: Response) => {
    const { id } = req.params;

    const user = utils.findUserById(users, id);
    res.send(user ? user.login : userNotFound);
};

export const createUserHandler = (req: Request, res: Response) => {
    const error = validateUser(req.body).error;

    if (error) {
        res.status(422).json({
            message: error?.message
        });
    }

    if (!error) {
        users.push({ id: uuid4(), ...req.body });
        res.send('Success');
    }
};

export const updateUser = (req: Request, res: Response) => {
    const error = validateUser(req.body).error;

    if (error) {
        res.status(400).json({
            message: error?.message
        });
    }

    if (!error) {
        const updatedUser: User = req.body;
        const updatedUserId  = req.params.id;
        users = utils.updateUser(users, updatedUser, updatedUserId);
        res.send('Success');
    }
};

export const getAllUsers = (req: Request, res: Response) => {
    const filteredUsers = utils.filterUserByDeletedFlag(users);
    res.send(filteredUsers);
};

export const getAutoSuggestUsers = (req: Request, res: Response) => {
    const substring = String(req.query.substring);
    const limit = Number(req.query.limit);
    const result = utils.getAutoSuggestions(users, substring, limit);

    res.send(result);
};

export const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;

    users = utils.softDeleteUser(users, id);

    res.send('Success');
};
